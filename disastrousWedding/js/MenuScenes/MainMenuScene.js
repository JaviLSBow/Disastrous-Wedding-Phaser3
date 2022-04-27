/* SCRIPT PAPRA CONTROLAR EL FUNCIONAMIENTO DE LA ESCENA DEL MENU */
/*-----------------------------------------------------------------------------------------------------------------------------*/

class MainMenuScene extends Phaser.Scene
{

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* CONSTRUCTOR */
    constructor(){ super('MainMenuScene'); }  // Se le asigna el nombre a la escena

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS BÁSICOS DE LA ESCENA */

    // METODO DE PRECARGA DE LA ESCENA
    preload()
    {

        // CARGA DE LA IMAGEN DEL MENU
        this.load.image('menu_image', 'res/sprites/introscene/brideintro0.png');

        // CARGA DE LAS IMAGENES DE LOS BOTONES
        this.load.image('start_button', 'res/sprites/introscene/startgamewedding.png');
        this.load.image('credits_button', 'res/sprites/introscene/creditswedding.png');

        // CARGA DEL ATLAS DE LA ANIMACION DEL MENU
        this.load.atlas('bride_intro_animation','res/sprites/introscene/brideintro.png', 'res/sprites/introscene/brideintro_atlas.json');

        // CARGA DEL AUDIO
        this.load.audio('main_theme', ["res/audio/music/A_Brides_SecretV2.mp3"]);  // Carga de la mUsica principal del juego
        this.load.audio('church_music', ["res/audio/music/A_Brides_Secret_InsideChurch.mp3"]);  // Carga de la versiOn de la mUsica de la iglesia
        this.load.audio('wind_sound', ["res/audio/wind.mp3"]);  // Carga del sonido de viento

    }

    // MÉTODO DE CREACIÓN DE LA ESCENA
    create()
    {

        // CREACION DE LOS OBJETOS DE UTILS PARA PODER LLAMAR A LAS FUNCIONES AUXILIARES DE FORMA EFICIENTE
        this.utils = new Utils();

        /*------------------------*/
        /* PARÁMETROS ALTERABLES */

        this.fade_time = 2000;  // Tiempo de fundido de la pantalla

        /*------------------------*/

        // FLAGS DE LA ESCENA
        this.can_change_scene = false;  // Flag para habilitar el de cambio de escena
        this.scene_is_changing = false;  // Flag para deshabilitar el cambio de escena sI ya se ha realizado

        // CREACIÓN DE LA IMAGEN DE FONDO (SPRITE)
        this.menu_image = new SpriteCreator(this, windows.width / 2, windows.height / 2, "menu_image", "main_menu_animation", "bride_intro_animation", "brideintro", 1, 2, 1, false);
        this.menu_image.fixedToCamera = true;  // Ajuste del menU a la cAmara

        // CREACION DEL BOTON DE START
        this.start_button = new SpriteCreator(this, windows.width / 2 - 120, windows.height / 2 + 10, "start_button", null, null, null, null, null, null, false); // CreaciOn del sprite
        this.start_button.setInteractive();  // Se establece que el botOn de Start serA interactivo
        this.start_button.on('pointerdown', this.ChangeSceneNewGame, this)  // Se establece que al pulsar el ratOn se cambie a la escena del juego

        // CREACION DEL BOTON DE CREDITOS
        this.credits_button = new SpriteCreator(this, windows.width / 2 - 120, windows.height / 2 + 100, "credits_button", null, null, null, null, null, null, false); // CreaciOn del sprite
        this.credits_button.setInteractive();  // Se establece que el botOn de los crEditos serA interactivo
        this.credits_button.on('pointerdown', this.ChangeSceneCredits, this)  // Se establece que al pulsar con el ratOn se cambie a la escena del juego

        // ADICION DE LA MUSICA DEL JUEGO
        this.main_theme = this.sound.add('main_theme', {loop: true, volume : 0.25});  // Adición de la mUsica principal del juego
        this.church_music = this.sound.add('church_music', {loop: true, volume : 0.25});  // Adición de la mUsica de la iglesia

        this.wind_sound = this.sound.add('wind_sound', {loop: false, volume : 1});  // Adición del sonido de viento

        this.cameras.main.fadeIn(this.fade_time);  // Fundido desde negro de la escena

    }

    // MÉTODO QUE SE EJECUTA UNA VEZ POR CADA FRAME
    update (time, delta)
    {
        // SI EL CAMBIO DE ESCENA ESTÁ PERMITIDO Y HA PASADO EL TIEMPO DE FUNDIDO
        if(this.can_change_scene && this.change_scene_timer < this.utils.obtenerMilisegundosActuales()){
            this.scene.start(this.next_scene,
                {next_scene_fade_time : 2000,
                    playerx: 40,
                    interactionsCounter: 0,
                    oldieATFlag : false,
                    dancersATFlag : false,
                    seriousATFlag : false,
                    angryATFlag : false,
                    scaredATFlag : false,
                    mainTheme: this.main_theme,
                    churchMusic: this.church_music
                });  // PASO DE PARAMETROS INICIALES A LA PRIMERA ZONA (IGNORADOS SI EL JUGADOR ELIGE LA ESCENA DE CREDITOS)
        } 

    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS PARA CONTROLAR LOS ASPECTOS ESPECIFICOS DEL CAMBIO DE ESCENA */

    // METODO PARA CONTROLAR LA TRANSICION AL PROPIO JUEGO
    ChangeSceneNewGame(){

        // Si la escena no estA cambiando ya
        if(!this.scene_is_changing){
            this.next_scene = "ZoneUno";  // Se establece la escena siguiente como la escena d4e inicio del juego
            this.main_theme.play();  // Se inicia la banda sonora del juego
        }

        this.utils.EnableSceneChange(this);  // Se llama al mEtodo general de cambio de escena

    }

    // METODO PARA CONTROLAR LA TRANSICION A LA PANTALLA DE CREDITOS
    ChangeSceneCredits(){

        // Si la escena no estA cambiando ya
        if(!this.scene_is_changing){
            this.next_scene = "CreditsScene";  // Se establece la escena siguiente como la escena de crEditos
            this.wind_sound.play();  // Suena el sonido de viento
        }

        this.utils.EnableSceneChange(this);  // Se llama al mEtodo general de cambio de escena

    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

}

/*-----------------------------------------------------------------------------------------------------------------------------*/