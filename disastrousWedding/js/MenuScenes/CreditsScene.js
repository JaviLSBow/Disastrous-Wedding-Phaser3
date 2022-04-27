/* SCRIPT PAPRA CONTROLAR EL FUNCIONAMIENTO DE LA ESCENA DE CREDITOS */
/*-----------------------------------------------------------------------------------------------------------------------------*/

class CreditsScene extends Phaser.Scene
{

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* CONSTRUCTOR */
    constructor(){ super('CreditsScene'); }  // Se le asigna el nombre a la escena

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS BÁSICOS DE LA ESCENA */

    // METODO DE PRECARGA DE LA ESCENA
    preload()
    {

        // CARGA DE LA IMAGEN DEL MENU
        this.load.image('credits_image', 'res/sprites/introscene/creditsscreen.png');

        // CARGA DE LAS IMAGEN DEL BOTON DE RETORNO
        this.load.image('return_button', 'res/sprites/introscene/returnarrow.png');

    }

    // MÉTODO DE CREACIÓN DE LA ESCENA
    create()
    {

        // CREACION DEL OBJETO DE UTILS PARA PODER LLAMAR A LAS FUNCIONES AUXILIARES DE FORMA EFICIENTE
        this.utils = new Utils();

        /*------------------------*/
        /* PARÁMETROS ALTERABLES */

        this.fade_time = 2000;  // Tiempo de fundido de la pantalla

        /*------------------------*/

        // FLAGS DE LA ESCENA
        this.can_change_scene = false;  // Flag para habilitar el de cambio de escena
        this.scene_is_changing = false;  // Flag para deshabilitar el cambio de escena sI ya se ha realizado

        // CREACIÓN DE LA IMAGEN DE FONDO (SPRITE)
        this.menu_image = new SpriteCreator(this, windows.width / 2, windows.height / 2, "credits_image", null, null, null, null, null, null, false);
        this.menu_image.fixedToCamera = true;  // Ajuste del menU a la cAmara

        // CREACION DEL BOTON DE RETORNO AL MENU PRINCIPAL
        this.return_button = new SpriteCreator(this, 40, 40, "return_button", null, null, null, null, null, null, false); // CreaciOn del sprite
        this.return_button.setInteractive();  // Se establece que el botOn de retorno serA interactivo
        this.return_button.on('pointerdown', this.ChangeSceneAux, this)  // Se establece que al pulsar con el ratOn en el botOn se cambie a la escena del juego

        this.cameras.main.fadeIn(this.fade_time);  // Fundido desde negro de la escena

    }

    // MÉTODO QUE SE EJECUTA UNA VEZ POR CADA FRAME
    update (time, delta)
    {
        // SI EL CAMBIO DE ESCENA ESTÁ PERMITIDO Y HA PASADO EL TIEMPO DE FUNDIDO
        if(this.can_change_scene && this.change_scene_timer < this.utils.obtenerMilisegundosActuales()) this.scene.start("MainMenuScene");  // Se vuelve a la escena del menU

    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS AUXILIARES */

    // METODO AUXILIAR PARA REALIZAR EL CAMBIO DE ESCENA A TRAVES DEL EVENTO
    ChangeSceneAux(){ this.utils.EnableSceneChange(this); }


/*-----------------------------------------------------------------------------------------------------------------------------*/

}

/*-----------------------------------------------------------------------------------------------------------------------------*/