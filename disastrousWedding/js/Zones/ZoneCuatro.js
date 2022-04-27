/* SCRIPT PAPRA CONTROLAR EL FUNCIONAMIENTO DE LA ESCENA DE LA ZONA 4 DEL JUEGO */
/*-----------------------------------------------------------------------------------------------------------------------------*/

class ZoneCuatro extends Phaser.Scene
{

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* CONSTRUCTOR */
    constructor() { super('ZoneCuatro'); }  // Se le asigna el nombre a la escena

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
        this.load.image('zone_4', 'res/sprites/zones/zone4.png');
        this.load.image('zone_4_grass', 'res/sprites/zones/zone4grass.png');

        // CARGA DE LAS IMAGENES Y ATLAS DEL NPC "HOMBRE ASUSTADO"
        this.load.image('scared_image', 'res/sprites/npcs/scared/BrideScaredGuy0.png');
        this.load.atlas('scared_animation','res/sprites/npcs/scared/bride_scared_guy.png', 'res/sprites/npcs/scared/bride_scared_guy_atlas.json');

        // CARGA DE LAS IMAGENES DE LOS DIALOGOS
        this.load.image('dialog_scaredguy', 'res/sprites/dialogs/DialogScaredGuy.png');

        // CARGA DE LAS VOCES DE LOS NPCs
        this.load.audio('scaredguy_voice', ["res/audio/voice/scaredguy_voice.mp3"]);  // Carga de la voz del NPC "Scared Guy"

    }

    // MÉTODO DE CREACIÓN DE LA ESCENA
    create()
    {

        // CREACION DE LOS RECURSOS COMUNES A TODAS LAS ESCENAS DE ZONA INDICANDO EL TIEMPO DE FUNDIDO DE LA ESCENA Y EL FONDO DE LA ESCENA
        this.common_zone.commonCreate(this.fade_time, "zone_4");

        // CREACION DE LOS NPCS
        this.scared = new Npc(this, 280, 290, "scared_image", "scared", "scared_animation", "bridescaredguy", 1, 16, 8, false, "dialog_scaredguy", this.scaredAlreadyTalked);  // CreaciOn de Scared Guy

        // CREACION DEL JUGADOR (DESPUES DE LOS NPCS DE LA ESCENA PARA QUE QUEDE POR DELANTE)
        this.player = new Player(this, this.player_pos_x, 290);

        // CREACION DE LOS OVERLAP (NO SE HACE EN LA CLASE NPC YA QUE DEBE GENERARSE ANTES QUE EL JUGADOR PARA APARACER POR DETRAS DE EL)
        this.scared.enableTrigger();
        
        // CREACION DE LA HIERBA DEL FRENTE DE LA ESCENA
        this.foreground_grass = new SpriteCreator(this, windows.width / 2, windows.height / 2, "zone_4_grass", null, null, null, null, null, null, false);

        // ADICION DE LOS AUDIOS DE LA ESCENA
        this.scared_voice = this.sound.add('scaredguy_voice', {loop: false, volume : 1.25});  // Adición de la voz del NPC "Scared Guy"

        // OVERLAP DEL JUGADOR CON LOS DOS LIMITES DEL MAPA DE CADA ZONA (SE TIENE QUE HACER DESPUES DE CREAR EL PLAYER)
        this.physics.add.overlap(this.player, this.left_screen_limit, this.moveToPreviousZone, null, this);
        this.physics.add.overlap(this.player, this.right_screen_limit, this.moveToNextZone, null, this);

    }

    // MÉTODO UPDATE QUE SE EJECUTA UNA VEZ POR CADA FRAME
    update (time, delta)
    {
        this.common_zone.commonUpdate();  // Llamada al mEtodo update comUn a todas las zonas
        this.scared.update(this.scared_voice);  // Llamada al mEtodo update del npc "Scared Guy"
        if(this.scared.already_talk) this.scaredAlreadyTalked = true;    // Se marca como realizada la interaccion con el NPC "scared"
    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS AUXILIARES */

    // METODO AUXILIAR PARA CAMBIAR A LA ZONA DE LA IZQUIERDA (ZONA 4 -> ZONA 3)
    moveToPreviousZone(){ this.common_zone.moveToZone("ZoneTres", windows.width - 40, this.interactionsCount, this.oldieAlreadyTalked, this.dancersAlreadyTalked, this.seriousAlreadyTalked, this.angryAlreadyTalked, this.scaredAlreadyTalked, this.main_theme, this.church_music); }
    // METODO AUXILIAR PARA CAMBIAR A LA ZONA DE LA DERECHA (ZONA 4 -> ZONA 1)
    moveToNextZone(){ this.common_zone.moveToZone("ZoneUno", 40, this.interactionsCount, this.oldieAlreadyTalked, this.dancersAlreadyTalked, this.seriousAlreadyTalked, this.angryAlreadyTalked, this.scaredAlreadyTalked, this.main_theme, this.church_music); }

}

/*-----------------------------------------------------------------------------------------------------------------------------*/