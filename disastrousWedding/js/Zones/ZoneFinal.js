/* SCRIPT PAPRA CONTROLAR EL FUNCIONAMIENTO DE LA ESCENA DE LA ZONA FINAL DEL JUEGO */
/*-----------------------------------------------------------------------------------------------------------------------------*/

class ZoneFinal extends Phaser.Scene
{

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* CONSTRUCTOR */
    constructor() { super('ZoneFinal'); }  // Se le asigna el nombre a la escena

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS BÁSICOS DE LA ESCENA */

    // METODO PARA RECIBIR LOS DATOS QUE PASAMOS DE LA ESCENA ANTERIOR
    init(data){

        this.fade_time = data.next_scene_fade_time;  // Tiempo de fading de la escena final

        // MUSICA
        this.main_theme = data.mainTheme;  // Clip de mUsica principal
        this.church_music = data.churchMusic;  // VersiOn de la mUsica en la iglesia

    }

    // METODO DE PRECARGA DE LA ESCENA
    preload()
    {

        // CARGA DE LA IMAGEN DEL FONDO
        this.load.image('zone_final', 'res/sprites/zones/zoneFinal.png');

        // CARGA DE LAS IMAGENES Y ATLAS DE LA NOVIA
        this.load.image('player_main_image', 'res/sprites/player/BrideIdle.png');
        this.load.atlas('bride_idle_animation','res/sprites/player/bride_idle.png', 'res/sprites/player/bride_idle_atlas.json');

        // CARGA DE LAS IMAGENES Y ATLAS DEL NPC "CURA"
        this.load.image('priest_image', 'res/sprites/npcs/priest/bridepriest0.png');
        this.load.atlas('priest_animation','res/sprites/npcs/priest/bridepriest.png', 'res/sprites/npcs/priest/bridepriest_atlas.json');

        // CARGA DE LA IMAGEN DEL BLOQUE DEL DIALOGO
        this.load.image('dialog_box', 'res/sprites/dialogs/DialogBox.png');

        // CARGA DE LAS IMAGENES DE LOS DIALOGOS
        this.load.image('dialog_priest_1', 'res/sprites/dialogs/DialogPriest1.png');
        this.load.image('dialog_priest_2', 'res/sprites/dialogs/DialogPriest2.png');
        this.load.image('dialog_priest_3', 'res/sprites/dialogs/DialogPriest3.png');
        this.load.image('dialog_priest_4', 'res/sprites/dialogs/DialogPriest4.png');

        // CARGA DE LAS VOCES DE LOS NPCs
        this.load.audio('priest_voice', ["res/audio/voice/priest_voice.mp3"]);  // Carga de la voz del NPC "Priest"


    }

    // MÉTODO DE CREACIÓN DE LA ESCENA
    create()
    {

        // CREACION DE LOS OBJETOS DE UTILS PARA PODER LLAMAR A LAS FUNCIONES AUXILIARES DE FORMA EFICIENTE
        this.utils = new Utils();

        if(this.fade_time > 0) this.cameras.main.fadeIn(this.fade_time);  // Fundido desde negro de la escena

        // CREACION DE LA ESCENA (FONDO, NOVIA, CURA Y BLOQUE DE DIALOGO)
        this.background = new SpriteCreator(this, windows.width / 2, windows.height / 2, "zone_final", null, null, null, null, null, null, false);
        this.bride = new SpriteCreator(this, 105, 275, "player_main_image", "player", "bride_idle_animation", "brideidle", 1, 20, 8, false);
        this.priest = new SpriteCreator(this, 470, 252, "priest_image", "priest", "priest_animation", "bridepriest", 1, 20, 12, false);
        this.dialog_box = new SpriteCreator(this, windows.width / 2, 25, "dialog_box", null, null, null, null, null, null, false);

        // SE MUESTRA INICIALMENTE EL PRIMER CUADRO DE DIALOGO
        this.priest_dialog = new SpriteCreator(this, windows.width / 2, 25, "dialog_priest_1", null, null, null, null, null, null, false);

        // ADICION DE LOS AUDIOS DE LA ESCENA
        this.priest_voice = this.sound.add('priest_voice', {loop: false, volume : 1.25});  // Adición de la voz del NPC "Priest"

        // FLAGS
        this.can_press_enter = true;  // Flag para permitir el pulsado de la tecla "ENTER" (evitar que se pulse muy rApido por parte del jugador)
        this.can_change_scene = false;  // Flag para permitir el cambio de escena
        this.scene_is_changing = false;  // Flag para deshabilitar el cambio de escena sI ya se ha realizado

        // TIEMPOS DE ESPERA
        this.time_to_press_enter = 0;
        this.time_to_change_scene = 0;

        // ATAJOS DE TECLADO
        this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);  // Atajo para permitir el paso de diAlogos al pulsar la tecla "ENTER"

        // VARIABLE PARA SABER QUE DIALOGO HAY QUE MOSTRAR POR PANTALLA
        this.dialog_number = 1;

        // CAMBIO DE MUSICA
        this.main_theme.stop();
        this.church_music.play();

        // SUENA EL PRIMER CLIP DE VOZ DEL CURA
        this.priest_voice.play();

    }

    // MÉTODO UPDATE QUE SE EJECUTA UNA VEZ POR CADA FRAME
    update (time, delta)
    {
        
        // SI SE PULSA LA TECLA ENTER
        if(this.keyEnter.isDown && this.time_to_press_enter < this.utils.obtenerMilisegundosActuales()){

            this.dialog_number++;  // Se incrementa el nUmero de diAlogo que toca

            if(this.dialog_number < 5) this.priest_dialog.destroy();  // Se destruye el diAlogo anterior

            // SE SELECCIONA EL DIALOGO QUE TOCA Y MUESTRA POR PANTALLA. SI YA HAN PASADO LOS 4 DIALOGOS SE VUELVE AL MENU PRINCIPAL
            if (this.dialog_number == 2) this.priest_dialog = new SpriteCreator(this, windows.width / 2, 25, "dialog_priest_2", null, null, null, null, null, null, false);
            else if (this.dialog_number == 3) this.priest_dialog = new SpriteCreator(this, windows.width / 2, 25, "dialog_priest_3", null, null, null, null, null, null, false);
            else if (this.dialog_number == 4) this.priest_dialog = new SpriteCreator(this, windows.width / 2, 25, "dialog_priest_4", null, null, null, null, null, null, false);
            if (this.dialog_number == 5) this.utils.EnableSceneChange(this);

            if(this.dialog_number < 5) this.priest_voice.play();  // Si el cura va a decir algo mAs suena su clip de voz

            this.time_to_press_enter = this.utils.obtenerMilisegundosActuales() + 500;  // Se fija un nuevo tiempo de espera para pulsar Enter

        }
        
        // SI EL CAMBIO DE ESCENA ESTÁ PERMITIDO Y HA PASADO EL TIEMPO DE FUNDIDO
        if(this.can_change_scene && this.change_scene_timer < this.utils.obtenerMilisegundosActuales()){
            
            // SE DESTRUYEN LOS DOS CLIPS DE MUSICA
            this.main_theme.destroy();
            this.church_music.destroy();

            this.scene.start("MainMenuScene");  // Se vuelve a la escena del menU

        }

    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

}

/*-----------------------------------------------------------------------------------------------------------------------------*/