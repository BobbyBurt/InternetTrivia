import eventsCenter from "../eventsCenter.js";

class scalemanager extends Phaser.Scene {

    constructor ()
    {
        super('boot');
    }

    preload()
    {
        
    }

    create ()
    {   
        // more setup stuff here
        // ...
        window.addEventListener('resize', this.resize.bind(this));

        this.registry.set('w', window.innerWidth * window.devicePixelRatio);
        this.registry.set('h', window.innerHeight * window.devicePixelRatio);

        this.scene.start('question-select', { round: 1});
        // this.scene.launch('newgroundsio');
    }

    resize ()
    {
        let w = window.innerWidth * window.devicePixelRatio;
        let h = window.innerHeight * window.devicePixelRatio;

        // manually resize the game with the Phaser 3.16 scalemanager
        this.scale.resize(w, h);

        this.registry.set('w', w);
        this.registry.set('h', h);

        eventsCenter.emit('resize');

        // Check which scene is active.
        for (let scene of this.scene.manager.scenes) {
            if (scene.scene.settings.active) {
                // Scale the camera
                scene.cameras.main.setViewport(0, 0, w, h);
                scene.cameras.main.setScroll(-w/2, -h/2);
            }
        }
    }

}

export default scalemanager;