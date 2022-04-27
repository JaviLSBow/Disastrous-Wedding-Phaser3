/* SCRIPT PAPRA CONTROLAR EL FUNCIONAMIENTO DE LA ESCENA DE LA ZONA 3 DEL JUEGO */
/*-----------------------------------------------------------------------------------------------------------------------------*/

class ZoneTres extends Phaser.Scene
{

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* CONSTRUCTOR */
    constructor() { super('ZoneTres'); }  // Se le asigna el nombre a la escena

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS BÁSICOS DE LA ESCENA */

    // METODO PARA RECIBIR LOS DATOS QUE PASAMOS DE LA ESCENA ANTERIOR
    init(data){

        // CREACION DEL CONTROLADOR DE ZONA COMUN A TODAS LAS ZONAS
        this.common_zone = new ZoneUtils(this);

        this.common_zone.commonInit(data);  // Llamada al init comun

    }

    // METODO DE PRECARGA DE LA ESCENA
    preload()
    {

        // CARGA DE LOS RECURSOS COMUNES A TODAS LAS ESCENAS DE ZONA
        this.common_zone.commonPreload();

        // CARGA DE LA IMAGEN DEL FONDO
        this.load.image('zone_3', 'res/sprites/zones/zone3closed.png');
        this.load.image('zone_3_grass', 'res/sprites/zones/zone3grass.png');

        // CARGA DE LA IMAGEN DE FONDO ABIERTA
        this.load.image('zone_3_door_opened', 'res/sprites/zones/zone3opened.png');

        // CARGA DE LAS IMAGENES Y ATLAS DEL NPC "MUJER ENFADADA"
        this.load.image('angry_image', 'res/sprites/npcs/angry/BrideAngryWoman0.png');
        this.load.atlas('angry_animation','res/sprites/npcs/angry/bride_angry_woman.png', 'res/sprites/npcs/angry/bride_angry_woman_atlas.json');

        // CARGA DE LAS IMAGENES DE LOS DIALOGOS
        this.load.image('dialog_angrywoman', 'res/sprites/dialogs/DialogAngryWoman.png');

        // CARGA DE LAS VOCES DE LOS NPCs
        this.load.audio('angrywoman_voice', ["res/audio/voice/angrywoman_voice.mp3"]);  // Carga de la voz del NPC "Angry woman"

    }

    // MÉTODO DE CREACIÓN DE LA ESCENA
    create()
    {

        // CREACION DE LOS RECURSOS COMUNES A TODAS LAS ESCENAS DE ZONA INDICANDO EL TIEMPO DE FUNDIDO DE LA ESCENA Y EL FONDO DE LA ESCENA
        if(this.interactionsCount < 5) this.common_zone.commonCreate(this.fade_time, "zone_3");
        else {
            this.common_zone.commonCreate(this.fade_time, "zone_3_door_opened");
            // Si hay mAs de 5 interacciones se crea un sprite de flecha para indicar al jugador que se puede interactuar con la puerta
            this.arrow = new SpriteCreator(this, 327, 150, "arrow_main_image", "arrow", "arrow_animation", "uparrow", 1, 2, 2, false);
            this.emptySprite = new SpriteCreator(this, 320, 290, "empty_image", null, null, null, null, null, null, false);  // Sprite vaciO para el overlap
        }

        // CREACION DE LOS NPCS
        if(this.interactionsCount < 5) this.angry = new Npc(this, 360, 290, "angry_image", "angry", "angry_animation", "brideangrywoman", 1, 20, 8, false, "dialog_angrywoman", this.angryAlreadyTalked);  // CreaciOn de Angry Woman si la puerta estA cerrada
        else  this.angry = new Npc(this, 430, 290, "angry_image", "angry", "angry_animation", "brideangrywoman", 1, 20, 8, false, "dialog_angrywoman", this.angryAlreadyTalked);  // CreaciOn de Angry Woman si la puerta estA abierta

        // CREACION DEL JUGADOR (DESPUES DE LOS NPCS DE LA ESCENA PARA QUE QUEDE POR DELANTE)
        this.player = new Player(this, this.player_pos_x, 290);

        // CREACION DE LOS OVERLAP (NO SE HACE EN LA CLASE NPC YA QUE DEBE GENERARSE ANTES QUE EL JUGADOR PARA APARACER POR DETRAS DE EL)
        this.angry.enableTrigger();
        
        // CREACION DE LA HIERBA DEL FRENTE DE LA ESCENA
        this.foreground_grass = new SpriteCreator(this, windows.width / 2, windows.height / 2, "zone_3_grass", null, null, null, null, null, null, false);

        // ADICION DE LOS AUDIOS DE LA ESCENA
        this.angry_voice = this.sound.add('angrywoman_voice', {loop: false, volume : 1.25});  // Adición de la voz del NPC "Angry Woman"

        // OVERLAP DEL JUGADOR CON LOS DOS LIMITES DEL MAPA DE CADA ZONA (SE TIENE QUE HACER DESPUES DE CREAR EL PLAYER)
        this.physics.add.overlap(this.player, this.left_screen_limit, this.moveToPreviousZone, null, this);
        this.physics.add.overlap(this.player, this.right_screen_limit, this.moveToNextZone, null, this);

        // SI TODAS LAS INTERACCIONES SE HAN REALIZADO SE PERMITE EL OVERLAP ENTRE EL JUGADOR Y LA PUERTA DE LA IGLESIA
        if(this.interactionsCount >= 5) this.physics.add.overlap(this.player, this.emptySprite, this.enterFinalLevel, null, this);

    }

    // MÉTODO UPDATE QUE SE EJECUTA UNA VEZ POR CADA FRAME
    update (time, delta)
    {
        this.common_zone.commonUpdate();  // Llamada al mEtodo update comUn a todas las zonas
        this.angry.update(this.angry_voice);  // Llamada al mEtodo update del npc "Angry Woman".
        if(this.angry.already_talk) this.angryAlreadyTalked = true;  // Se marca como realizada la interaccion con el NPC "angry"

    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS AUXILIARES */

    // METODO PARA PASAR AL EL ULTIMO NIVEL SI LA PUERTA ESTA ABIERTA
    enterFinalLevel(){
        // Si el jugador pulsa la flecha de arriba pasa a la Ultima zona (escena final)
        if(this.player.cursor.up.isDown ) this.scene.start("ZoneFinal", {next_scene_fade_time : 2000, mainTheme: this.main_theme, churchMusic: this.church_music});
    }

    // METODO AUXILIAR PARA CAMBIAR A LA ZONA DE LA IZQUIERDA (ZONA 3 -> ZONA 2)
    moveToPreviousZone(){ this.common_zone.moveToZone("ZoneDos", windows.width - 40, this.interactionsCount, this.oldieAlreadyTalked, this.dancersAlreadyTalked, this.seriousAlreadyTalked, this.angryAlreadyTalked, this.scaredAlreadyTalked, this.main_theme, this.church_music); }
    // METODO AUXILIAR PARA CAMBIAR A LA ZONA DE LA DERECHA (ZONA 3 -> ZONA 4)
    moveToNextZone(){ this.common_zone.moveToZone("ZoneCuatro", 40, this.interactionsCount, this.oldieAlreadyTalked, this.dancersAlreadyTalked, this.seriousAlreadyTalked, this.angryAlreadyTalked, this.scaredAlreadyTalked, this.main_theme, this.church_music); }

}

/*-----------------------------------------------------------------------------------------------------------------------------*/