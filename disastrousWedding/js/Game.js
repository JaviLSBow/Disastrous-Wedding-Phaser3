/* SCRIPT QUE CONTROLA LA CONFIGURACIÓN BÁSICA DEL JUEGO */
/*-----------------------------------------------------------------------------------------------------------------------------*/

/* PARÁMETROS DE CONFIGURACIÓN DE LA ESCENA */
var windows = {width:640, height: 360}
var config = {
    type: Phaser.AUTO,
    width: windows.width,
    height: windows.height,
    parent: "canvas",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scene: [MainMenuScene, CreditsScene, ZoneUno, ZoneDos, ZoneTres, ZoneCuatro, ZoneFinal],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 200 }            
        }
    }
};

/*-----------------------------------------------------------------------------------------------------------------------------*/

/* CREACIÓN DEL NUEVO JUEGO */
var game = new Phaser.Game(config);

/*-----------------------------------------------------------------------------------------------------------------------------*/

/* REFERENCIAS DE INTERÉS */

//'http://labs.phaser.io'
//'assets/skies/space3.png'
//'assets/sprites/phaser3-logo.png'
//'assets/particles/red.png'

/*-----------------------------------------------------------------------------------------------------------------------------*/
