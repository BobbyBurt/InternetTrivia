// import Phaser from './lib/phaser.js'

    // scenes
import scalemanager from './scenes/scalemanager.js'
import menu from './scenes/menu.js'

window.game = new Phaser.Game({
    type: Phaser.WEBGL,
    backgroundColor: '#969fa3',
    title: 'Microgames',
    url: 'URL HERE',
    version: 'version uuhh',
    pixelArt: false,
    banner: {
        // text: '#ffffff',
        // background: [
        //     '#fff200',
        //     '#38f0e8',
        //     '#00bff3',
        //     '#ff0066'
        // ],
        hidePhaser: false
    },
    input: {
        gamepad: true
    },
    scale: {
        mode: Phaser.Scale.NONE,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
        zoom: 1 / window.devicePixelRatio
    },
    plugins: {
        scene: [
            { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
        ]
    },

    scene: [scalemanager, menu]
    });