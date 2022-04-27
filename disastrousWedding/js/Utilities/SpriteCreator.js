/* SCRIPT PARA MANEJAR EL TRATAMIENTO GENERAL DE LOS SPRITES (CARACTERISTICAS QUE SE DEBEN REGULAR EN LA CREACION DE CADA SPRITE)  */
/*-----------------------------------------------------------------------------------------------------------------------------*/

class SpriteCreator extends Phaser.Physics.Arcade.Sprite
{

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* CONSTRUCTOR */
    // PARAMETROS: escena, posiciOn, imagen del sprite, nombre de la animaciOn (null == NO HAY ANIMACION), referencoa de la animaciOn, prefijo de la animaciOn, frame inicial, nUmero total de frames, framerate de la animaciOn y uso de gravedad
    constructor(scene, x, y, image_reference, default_animation_custom_name, default_animation_reference, default_animation_prefix, initial_frame, frame_number, default_animation_frameRate, gravity_enabled) 
    {
        super(scene, x, y, image_reference);  // Llamada al constructor "super" con los parámetros de escena, posiciOn e imagen del sprite

        this.scene = scene;  // Adición de la escena en la que se localiza el sprite

        // INCORPORACIÓN DEL SPRITE A LA ESCENA LÓGICA Y A LA ESCENA FÍSICA
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        /*------------------------*/
        /* ASINGACIÓN DE ANIMACIONES */

        // ANIMACIÓN POR DEFECTO DEL SPRITE
        if(default_animation_custom_name != null){

            this.anims.create({
                key: default_animation_custom_name,  // Clave de la animaciOn
                frames: this.scene.anims.generateFrameNames(default_animation_reference, { start: initial_frame, end: frame_number, prefix: default_animation_prefix}),  // Frames
                frameRate: default_animation_frameRate,  // FrameRate
                repeat: -1  // Loop por defecto (Valor -1)
            });

            this.play(default_animation_custom_name, true);

        }

        /*------------------------*/

        // FIJACION DE LA GRAVEDAD EN FUNCION DEL PARAMETRO RECIBIDO
        if(gravity_enabled == true) this.body.allowGravity = true;
        else this.body.allowGravity = false;
        
    }

    /*-----------------------------------------------------------------------------------------------------------------------------*/

}

/*-----------------------------------------------------------------------------------------------------------------------------*/
