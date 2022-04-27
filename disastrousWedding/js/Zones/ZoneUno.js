/* SCRIPT PAPRA CONTROLAR EL FUNCIONAMIENTO DE LA ESCENA DE LA ZONA 1 DEL JUEGO */
/*-----------------------------------------------------------------------------------------------------------------------------*/

class ZoneUno extends Phaser.Scene
{

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* CONSTRUCTOR */
    constructor() { super('ZoneUno'); }  // Se le asigna el nombre a la escena

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
        this.load.image('zone_1', 'res/sprites/zones/zone1.png');
        this.load.image('zone_1_grass', 'res/sprites/zones/zone1grass.png');

        // CARGA DE LAS IMAGENES Y ATLAS DEL NPC "OLDIE"
        this.load.image('oldie_image', 'res/sprites/npcs/oldie/BrideOldie0.png');
        this.load.atlas('oldie_animation','res/sprites/npcs/oldie/bride_oldie.png', 'res/sprites/npcs/oldie/bride_oldie_atlas.json');

        // CARGA DE LAS IMAGENES Y ATLAS DEL NPC "BAILARINES"
        this.load.image('dancers_image', 'res/sprites/npcs/dancers/BrideDancers0.png');
        this.load.atlas('dancers_animation','res/sprites/npcs/dancers/bride_dancers.png', 'res/sprites/npcs/dancers/bride_dancers_atlas.json');

        // CARGA DE LAS IMAGENES DE LOS DIALOGOS
        this.load.image('dialog_oldie', 'res/sprites/dialogs/DialogOldie.png');
        this.load.image('dialog_dancers', 'res/sprites/dialogs/DialogDancers.png');

        // CARGA DE LAS VOCES DE LOS NPCs
        this.load.audio('oldie_voice', ["res/audio/voice/oldie_voice.mp3"]);  // Carga de la voz del NPC "Oldie"
        this.load.audio('dancers_voice', ["res/audio/voice/dancers_voice.mp3"]);  // Carga de la voz del NPC "Bailarines"

    }

    // MÉTODO DE CREACIÓN DE LA ESCENA
    create()
    {
        // CREACION DE LOS RECURSOS COMUNES A TODAS LAS ESCENAS DE ZONA INDICANDO EL TIEMPO DE FUNDIDO DE LA ESCENA Y EL FONDO DE LA ESCENA
        this.common_zone.commonCreate(this.fade_time, "zone_1");

        // CREACION DE LOS NPCS
        this.oldie = new Npc(this, 240, 290, "oldie_image", "oldie", "oldie_animation", "brideoldie", 1, 20, 8, false, "dialog_oldie", this.oldieAlreadyTalked);  // CreaciOn de Oldie
        this.dancers = new Npc(this, 440, 270, "dancers_image", "dancers", "dancers_animation", "dancers", 1, 20, 8, false, "dialog_dancers", this.dancersAlreadyTalked);  // CreaciOn de los bailarines

        // CREACION DEL JUGADOR (DESPUES DE LOS NPCS DE LA ESCENA PARA QUE QUEDE POR DELANTE)
        this.player = new Player(this, this.player_pos_x, 290);

        // CREACION DE LOS OVERLAP (NO SE HACE EN LA CLASE NPC YA QUE DEBE GENERARSE ANTES QUE EL JUGADOR PARA APARACER POR DETRAS DE EL)
        this.oldie.enableTrigger();
        this.dancers.enableTrigger();
        
        // CREACION DE LA HIERBA DEL FRENTE DE LA ESCENA
        this.foreground_grass = new SpriteCreator(this, windows.width / 2, windows.height / 2, "zone_1_grass", null, null, null, null, null, null, false);

        // ADICION DE LOS AUDIOS DE LA ESCENA
        this.oldie_voice = this.sound.add('oldie_voice', {loop: false, volume : 1});  // Adición de la voz del NPC "Oldie"
        this.dancers_voice = this.sound.add('dancers_voice', {loop: false, volume : 0.75});  // Adición de la voz del NPC "Bailarines"

        // COMPORTAMIENTO POR EL CONTACO CON LOS DOS LIMITES DEL MAPA DE CADA ZONA (SE TIENE QUE HACER DESPUES DE CREAR EL PLAYER)
        this.physics.add.overlap(this.player, this.left_screen_limit, this.moveToPreviousZone, null, this);
        this.physics.add.overlap(this.player, this.right_screen_limit, this.moveToNextZone, null, this);

        

    }

    // MÉTODO UPDATE QUE SE EJECUTA UNA VEZ POR CADA FRAME
    update (time, delta)
    {
        this.common_zone.commonUpdate();  // Llamada al mEtodo update comUn a todas las zonas
        this.oldie.update(this.oldie_voice);  // Llamada al mEtodo update del npc "Oldie"
        if(this.oldie.already_talk) this.oldieAlreadyTalked = true;  // Se marca como realizada la interaccion con el NPC "oldie"
        this.dancers.update(this.dancers_voice);  // Llamada al mEtodo update del npc "Bailarines"
        if(this.dancers.already_talk) this.dancersAlreadyTalked = true;  // Se marca como realizada la interaccion con el NPC "dancers"
    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS AUXILIARES */

    // METODO AUXILIAR PARA CAMBIAR A LA ZONA DE LA IZQUIERDA (ZONA 1 -> ZONA 4)
    moveToPreviousZone(){ this.common_zone.moveToZone("ZoneCuatro", windows.width - 40, this.interactionsCount, this.oldieAlreadyTalked, this.dancersAlreadyTalked, this.seriousAlreadyTalked, this.angryAlreadyTalked, this.scaredAlreadyTalked, this.main_theme, this.church_music); }
       // METODO AUXILIAR PARA CAMBIAR A LA ZONA DE LA DERECHA (ZONA 1 -> ZONA 2)
    moveToNextZone(){ this.common_zone.moveToZone("ZoneDos", 40, this.interactionsCount, this.oldieAlreadyTalked, this.dancersAlreadyTalked, this.seriousAlreadyTalked, this.angryAlreadyTalked, this.scaredAlreadyTalked, this.main_theme, this.church_music); }

}

/*-----------------------------------------------------------------------------------------------------------------------------*/