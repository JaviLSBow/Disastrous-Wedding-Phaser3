/* SCRIPT QUE AGRUPA FUNCIONES REUTILIZABLES EN DIFERENTES CONTEXTOS */
/*-----------------------------------------------------------------------------------------------------------------------------*/

/* CLASE DE LOS UTILS */
class Utils{

/*-----------------------------------------------------------------------------------------------------------------------------*/

    /* MÉTODOS PARA REGULAR LOS TIEMPOS */

    // MÉTODO PARA OBTENER EL TIEMPO EN MILISEGUNDOS Y ELABORAR CONTADORES
    obtenerMilisegundosActuales(){
        var fecha_actual = new Date();  // Se recoge la fecha actual
        var milisegundos_actuales = fecha_actual.getTime();  // Se calculan los milisegundos desde las 00:00 del 1 de Enero de 1970 hasta ahora
        return milisegundos_actuales;  // Se devuelven los milisegundos
    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

    // METODO PARA CONTROLAR LOS ASPECTOS GENERALES DE LA TRANSICION ENTRE ESCENAS
    EnableSceneChange(scene_that_called){

        // SI LA ESCENA NO ESTA CAMBIANDO YA
        if(scene_that_called.scene_is_changing != null && !scene_that_called.scene_is_changing){

            scene_that_called.scene_is_changing = true;  // Se indica que la escena ya estA en proceso de cambio

            scene_that_called.can_change_scene = true;  // Se permite el cambio de escena (la variable debe existir con este nombre en el script de la escena)

            scene_that_called.change_scene_timer = this.obtenerMilisegundosActuales() + scene_that_called.fade_time;  // Se establece el contador para el cambio de escena  (la variable debe existir con este nombre en el script de la escena)

            scene_that_called.cameras.main.fadeOut(scene_that_called.fade_time);  // Se inicia el fundido a negro de la escena

        }

    }

/*-----------------------------------------------------------------------------------------------------------------------------*/

}

/*-----------------------------------------------------------------------------------------------------------------------------*/
