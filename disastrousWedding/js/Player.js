/* SCRIPT QUE CONTROLA LA CLASE DEL JUGADOR */
/*-----------------------------------------------------------------------------------------------------------------------------*/

class Player extends SpriteCreator
{

    /* CONSTRUCTOR */
    constructor(scene, x, y)
    {

        // CreaciOn del sprite
        super(scene, x, y, 'player_main_image', null, null, null, null, null, null, false);  // Llamada al constructor "super" (como hay más de una animaciOn se incluyen en el constructor hijo y aquI se pasa null)
        
        // AdiciOn de parAmetros necesarios otros mEtodos
        this.scene = scene;

        // ATAJOS DE TECLADO
        this.cursor = this.scene.input.keyboard.createCursorKeys();  // Atajo para las teclas bAsicas

        /*------------------------*/
        /* ASIGNACIÓN DE ANIMACIONES */

        // IDLE
        this.anims.create({
            key: 'player_idle',
            frames: this.scene.anims.generateFrameNames('bride_idle_animation', { start: 1, end: 19, prefix: 'brideidle' }),
            frameRate: 12,
            repeat: -1
        });

        // CAMINAR
        this.anims.create({
            key: 'player_walk',
            frames: this.scene.anims.generateFrameNames('bride_walk_animation', { start: 1, end: 4, prefix: 'bridewalk' }),
            frameRate: 8,
            repeat: -1
        });

        /*------------------------*/

        // FLAGS DE COMPORTAMIENTO
        this.player_can_move = true;  // Flag para permitir el movimiento del jugador

        /*------------------------*/
        /* PARÁMETROS ALTERABLES */

        this.player_speed = 200;  // Velocidad del jugador

        /*------------------------*/

    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS BASICOS */

    // METODO UPDATE QUE SE EJECUTA EN CADA FRAME AL SER LLAMADA DESDE EL UPDATE DE LA ESCENA
    update(time, delta, scene)
    {

        // SI EL JUGADOR PUEDE MOVERSE
        if(this.player_can_move){

            /*------------------------*/
            /* MOVIMIENTO DEL JUGADOR */

            // SI SE PULSA LA FLECHA IZQUIERDA EL JUGADOR AVANZA HACIA LA IZQUIERDA
            if(this.cursor.left.isDown)
            {
                this.setVelocityX(-this.player_speed);  // Velocidad negativa = Avance hacia la izquierda
                this.setFlipX(true);   // Se gira el sprite
            }

            // SI SE PULSA LA FLECHA DERECHA EL JUGADOR AVANZA HACIA LA DERECHA
            else if(this.cursor.right.isDown)
            {
                this.setVelocityX(this.player_speed);  // Velocidad positiva = Avance hacia la derecha
                this.setFlipX(false);   // No se gira el sprite
                
            }

            // SI NO SE PULSA NADA EL JUGADOR PERMANECE PARADO
            else this.setVelocityX(0);  // Velocidad 0 = Jugador parado

            /*------------------------*/
            /* CARGA DE LAS ANIMACIONES */
            if(this.body.velocity.x != 0) this.play('player_walk', true);  // AnimaciOn de caminar si la velocidad es distinta de 0
            else this.play('player_idle', true);  // AnimaciOn de idle si la velocidad es igual a 0

            /*------------------------*/
            
        }

    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

}

/*-----------------------------------------------------------------------------------------------------------------------------*/