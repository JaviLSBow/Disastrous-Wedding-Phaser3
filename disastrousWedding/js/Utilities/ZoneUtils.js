/* SCRIPT PAPRA CONTROLAR EL FUNCIONAMIENTO DE LA ESCENA DE LA ZONA 1 DEL JUEGO */
/*-----------------------------------------------------------------------------------------------------------------------------*/

class ZoneUtils
{

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* CONSTRUCTOR */
    // Se recoge el identificador de la escena que lo invoca
    constructor(zone) { this.current_zone = zone; }

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS BÁSICOS SIMULADOS DE LA ESCENA */

    // METODO DE INIT DE LA ESCENA (RECOGIDA DE DATOS RECIBIDOS DESDE LA ESCENA ANTERIOR)
    commonInit(data){

        this.current_zone.fade_time = data.next_scene_fade_time;  // Tiempo de fading (Diferente desde el menU o desde otra zona)
        this.current_zone.player_pos_x = data.playerx;  // PosiciOn inicial del jugador a lo largo del eje horizontal. (Para saber si viene de la izquierda o de la derecha)
        
        // CONTADOR DE INTERACCIONES CON LOS NPCS
        this.current_zone.interactionsCount = data.interactionsCounter;  // Se recoge el valor del contador de interacciones con los npcs
        if(this.current_zone.interactionsCount == undefined) this.current_zone.interactionsCount = 0;  // Si el contador de interacciones no tiene valor definido se pone a 0

        this.current_zone.oldieAlreadyTalked = data.oldieATFlag; // Flag de interaccion con NPC 'oldie'
        this.current_zone.dancersAlreadyTalked = data.dancersATFlag; // Flag de interaccion con NPC 'dancers'
        this.current_zone.seriousAlreadyTalked = data.seriousATFlag; // Flag de interaccion con NPC 'serious'
        this.current_zone.angryAlreadyTalked = data.angryATFlag; // Flag de interaccion con NPC 'angry'
        this.current_zone.scaredAlreadyTalked = data.scaredATFlag; // Flag de interaccion con NPC 'scared'

        // MUSICA
        this.current_zone.main_theme = data.mainTheme;  // Clip de mUsica principal
        this.current_zone.church_music = data.churchMusic;  // VersiOn de la mUsica en la iglesia

    }

    // METODO DE PRECARGA DE LA ESCENA
    commonPreload()
    {

        // CARGA DE LA IMAGEN EN BLANCO
        this.current_zone.load.image('empty_image', 'res/sprites/emptySprite.png');

        // CARGA DE LAS IMAGENES Y ATLAS DE LAS ANIMACIONES DEL JUGADOR
        this.current_zone.load.image('player_main_image', 'res/sprites/player/BrideIdle.png');
        this.current_zone.load.atlas('bride_idle_animation','res/sprites/player/bride_idle.png', 'res/sprites/player/bride_idle_atlas.json');
        this.current_zone.load.atlas('bride_walk_animation','res/sprites/player/bride_walk.png', 'res/sprites/player/bride_walk_atlas.json');

        // CARGA DE LA IMAGEN DEL BLOQUE DEL DIALOGO
        this.current_zone.load.image('dialog_box', 'res/sprites/dialogs/DialogBox.png');

        // CARGA DE LA ANIMACIÓN DE LA FLECHA
        this.current_zone.load.image('arrow_main_image', 'res/sprites/arrow/uparrow1.png');
        this.current_zone.load.atlas('arrow_animation','res/sprites/arrow/uparrow.png', 'res/sprites/arrow/uparrow_atlas.json');

    }

    // MÉTODO DE CREACIÓN DE LA ESCENA
    commonCreate(current_zone_fade_time, background_image_id, previous_zone_scene_id, next_zone_scene_id)
    {

        /*------------------------*/
        /* PARÁMETROS ALTERABLES */

        this.current_zone.fade_time = current_zone_fade_time;  // Tiempo de fundido de la pantalla

        /*------------------------*/

        if(this.current_zone.fade_time > 0) this.current_zone.cameras.main.fadeIn(this.current_zone.fade_time);  // Fundido desde negro de la escena si es necesario

        // DEFINICION DE LA ZONA PREVIA Y DE LA ZONA SIGUIENTE
        this.current_zone.previous_zone_scene_id = previous_zone_scene_id;
        this.current_zone.next_zone_scene_id = next_zone_scene_id;

        // FLAGS DE LA ESCENA
        this.current_zone.can_change_scene = false;  // Flag para habilitar el de cambio de escena
        this.scene_is_changing = false;  // Flag para deshabilitar el cambio de escena sI ya se ha realizado

        // CREACION DEL SPRITE DE LA IMAGEN DE FONDO
        this.current_zone.background = new SpriteCreator(this.current_zone, windows.width / 2, windows.height / 2, background_image_id, null, null, null, null, null, null, false);
        this.current_zone.background.fixedToCamera = true;  // Ajuste del menU a la cAmara

        // CREACION DE LOS LIMITES DEL MAPA

        // Limite izquierdo
        this.current_zone.left_screen_limit = new SpriteCreator(this.current_zone, 0, 290, "empty_image", null, null, null, null, null, null, false);
        this.current_zone.left_screen_limit.body.immovable = true;

        // Limite derecho
        this.current_zone.right_screen_limit = new SpriteCreator(this.current_zone, windows.width, 290, "empty_image", null, null, null, null, null, null, false);
        this.current_zone.right_screen_limit.body.immovable = true;

    }

    // MÉTODO UPDATE QUE SE EJECUTA UNA VEZ POR CADA FRAME
    commonUpdate () { this.current_zone.player.update(); } // Llamada al mEtodo update del jugador

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS AUXILIARES */

    // METODO GENERICO PARA CAMBIAR DE ZONA EN LOS LIMITES DEL MAPA PASANDO LA INFORMACION PERMANENTE ENTRE ESCENAS
    moveToZone(next_zone, next_player_pos_x, interactionsCount, oldieATValue, dancersATValue, seriousATValue, angryATValue, scaredATValue, mainThemeClip, churchMusicClip){ 

        this.current_zone.scene.start(next_zone, {
            next_scene_fade_time : 0,
            playerx : next_player_pos_x, 
            interactionsCounter : interactionsCount,
            oldieATFlag : oldieATValue,
            dancersATFlag : dancersATValue,
            seriousATFlag : seriousATValue,
            angryATFlag : angryATValue,
            scaredATFlag : scaredATValue,
            mainTheme: mainThemeClip,
            churchMusic: churchMusicClip
        })

    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

}

/*-----------------------------------------------------------------------------------------------------------------------------*/