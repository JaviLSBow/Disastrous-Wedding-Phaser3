/* SCRIPT QUE CONTROLA EL COMPORTAMIENTO GENERAL DE LOS NPCS */
/*-----------------------------------------------------------------------------------------------------------------------------*/

class Npc extends SpriteCreator
{

    /* CONSTRUCTOR */
    constructor(scene, x, y, image_reference, default_animation_custom_name, npc_animation_reference, npc_animation_prefix, initial_frame, frame_number, npc__animation_frameRate, npc_gravity, message_id, has_talked)
    {

        // CreaciOn del sprite
        super(scene, x, y, image_reference, default_animation_custom_name, npc_animation_reference, npc_animation_prefix, initial_frame, frame_number, npc__animation_frameRate, npc_gravity);  // Llamada al constructor "super" (como hay más de una animaciOn se incluyen en el constructor hijo y aquI se pasa null)
        
        // AdiciOn de parAmetros necesarios en otros mEtodos
        this.scene = scene;  // Escena
        this.message_id = message_id;  // Mensaje del NPC
        
        // ATAJOS DE TECLADO
        this.cursor = this.scene.input.keyboard.createCursorKeys();  // Atajo para permitir la interacciOn con el jugador con la flecha de arriba
        this.keyEnter = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);  // Atajo para permitir el fin de la interacciOn con el jugador con la tecla "ENTER"

        // FLAGS DE COMPORTAMIENTO
        this.can_speak = false;  // Flag para permitir la interacciOn
        this.can_overlap = true;  // Flag para permitir el overlap

        this.already_talk = has_talked; // Flag que indica si ya has hablado o no con el NPC

        // CreaciOn de la flecha
        if(!this.already_talk) this.arrow = new SpriteCreator(this.scene, x, y-95, "arrow_main_image", "arrow", "arrow_animation", "uparrow", 1, 2, 2, false);

    }
    
/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS BASICOS */

    // METODO UPDATE QUE SE EJECUTA EN CADA FRAME AL SER LLAMADA DESDE EL UPDATE DE LA ESCENA
    update(voice_clip)
    {

        /*------------------------*/
        /* INTERACCION CON EL JUGADOR */

        // SI HAY CONTACTO CON EL JUGADOR Y SE PULSA LA FLECHA DE ARRIBA SE PERMITE LA INTERACCION DEL NPC CON EL JUGADOR
        if(this.can_speak && this.cursor.up.isDown){

                this.can_speak = false;  // El jugador no puede hablar porque ya estA hablando
                this.can_overlap = false;  // El jugador no puede entrar en contacto con el NPC porque ya estA en contacto

                // CREACION DEL BLOQUE DE DIALOGO GENERICO JUNTO AL MENSAJE ESPECIFICO DEL NPC
                this.dialog_box = new SpriteCreator(this.scene, windows.width / 2, 25, "dialog_box", null, null, null, null, null, null, false);
                this.dialog_message = new SpriteCreator(this.scene, windows.width / 2, 25, this.message_id, null, null, null, null, null, null, false);

                // SE DESHABILITA EL MOVIMIENTO DEL JUGADOR (VELOCIDAD = 0)
                this.scene.player.player_can_move = false;
                this.scene.player.setVelocityX(0);
                this.scene.player.play('player_idle', true);  // Se cambia a la animaciOn de Idle del jugador

                // SUENA LA VOZ DEL PERSONAJE
                voice_clip.play();

                this.dialog_box_is_enabled = true;  // Se indica que el bloque de diAlogo estA activo
                
        }

        // SI EL BLOQUE DE DIALOGO ESTA ACTIVO Y SE PULSA ENTER
        if(this.dialog_box_is_enabled && this.keyEnter.isDown){

            this.dialog_box_is_enabled = false;  // Se indica que el bloque de diAlogo ya no estA activo

            // SE DESTRUYEN LOS SPRITES DE DIALOGO (BLOQUE Y MENSAJE)
            this.dialog_message.destroy();
            this.dialog_box.destroy();

            // SE COMPRUEBA SI YA HEMOS HABLADO CON EL NPC
            if(this.already_talk != true){
                this.already_talk = true;   // Marcamos que ya se ha interactuado con el NPC
                this.scene.interactionsCount++;  // Se incrementa el numero de interacciones realizadas
                this.arrow.destroy();   //Se destruye el sprite de la flecha
            }

            this.scene.player.player_can_move = true;  // Se habilita de nuevo el movimiento del jugador

        }

        if(!this.dialog_box_is_enabled ) this.can_overlap = true;  // Se permite el overlap si el cuadro de diAlogo no estA abierto

        /*------------------------*/

        this.can_speak = false;  // Por defecto no se puede hablar con el NPC. Se podrA solo si el jugador hace overlap con el

    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* METODOS AUXILIARES */

    // METODO PARA ESTABLECER EL OVERLAP DEL NPC CON EL JUGADOR
    enableTrigger(){ this.scene.physics.add.overlap(this.scene.player, this, this.enablePlayerTalk, null, this); }

    // METODO PARA PERMITIR LA INTERACCION ENTRE NPC Y JUGADOR SI SE PUEDE HACER OVERLAP ENTRE ELLOS
    enablePlayerTalk(sprite1, sprite2){ if(this.can_overlap) this.can_speak = true; }
    
    // METODO PARA PERMITIR EL OVERLAP DEL NPC CON EL JUGADOR
    enableOverlap(sprite1, sprite2){ this.can_overlap = true; }

/*-----------------------------------------------------------------------------------------------------------------------------*/

}

/*-----------------------------------------------------------------------------------------------------------------------------*/