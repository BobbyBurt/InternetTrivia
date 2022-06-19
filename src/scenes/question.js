import eventsCenter from "../eventsCenter.js";

export default class question extends Phaser.Scene
{
    constructor()
    {
        super('question'); // defining unique key

        /** @type {object} parsed json from local storage on setup */
        this.gamepadConfig;
    }

    // configure scene
    init()
    {
        
    }

    // queue assets to load
    preload()
    {
        this.load.image('ball', 'assets/blue-ball.png');
    }

    create()
    {   
        // CREATE QUESTION BUTTONS

        /** @type {Phaser.GameObjects.Container} */
        this.answer = ['', '', '', ''];
        this.answer[3] = this.createAnswerContainer(0, 300, 'answer 1', 1);
        this.answer[1] = this.createAnswerContainer(-400, 150, 'answer 2', 2);
        this.answer[2] = this.createAnswerContainer(400, 150, 'answer 3', 0);
        this.answer[0] = this.createAnswerContainer(0, 0, 'answer 4', 0);

        // QUESTION

        this.loadQuestion();
        
        // ADPATIVE DISPLAY
        
        this.cameras.main.centerOn(0, 0);

        eventsCenter.on('resize', () => {

            this.resizeScene();
        });

        // GAMEPAD SETUP

        this.gamepadConfig = this.readGamepadConfig();

        this.gamepads = this.input.gamepad.gamepads;

        this.input.gamepad.on('connected', pad => {
            console.log(pad.index + ' connected!');
            
            this.gamepads[pad.index].on('down', (index, value, button) => {
    
                switch(index)
                {
                    case this.gamepadConfig.ButtonUp:
                    this.answer[0].setAlpha(0.5);
                    break;

                    case this.gamepadConfig.ButtonLeft:
                    this.answer[1].setAlpha(0.5);
                    break;

                    case this.gamepadConfig.ButtonRight:
                    this.answer[2].setAlpha(0.5);
                    break;

                    case this.gamepadConfig.ButtonDown:
                    this.answer[3].setAlpha(0.5);
                    break;
                }

            });

            this.gamepads[pad.index].on('up', (index, value, button) => {
    
                switch(index)
                {
                    case this.gamepadConfig.ButtonUp:
                    this.answer[0].setAlpha(1);
                    break;

                    case this.gamepadConfig.ButtonLeft:
                    this.answer[1].setAlpha(1);
                    break;

                    case this.gamepadConfig.ButtonRight:
                    this.answer[2].setAlpha(1);
                    break;

                    case this.gamepadConfig.ButtonDown:
                    this.answer[3].setAlpha(1);
                    break;
                }

            });
        });
    }

    update()
    {

    }

    resizeScene()
    {
        this.cameras.main.centerOn(0, 0);
    }

    /**
     * creates answer text prompt
     * 
     * @param x position
     * @param y position
     * @param label position
     * @param colour 0=grey 1=green 2=red
     * @return {Phaser.GameObjects.container}
     */
    createAnswerContainer(x, y, label, colour)
    {
        // SETTINGS
        this.roundedCorners = true;
        this.roundedRadius = 15;
        this.fillcolours = ['0xa6a6a6', '0x039347', '0xF60501'];
        this.strokecolours = ['0xbfbfbf', '0x04af54', '0xff4d4d'];


        this.graphics = this.add.graphics();
        this.label = this.add.text(0, 0, label, {color: 'white', fontSize: '35px', fontFamily: 'arial'}).setAlign('center').setOrigin(0.5, 0.5);
        this.graphics.fillStyle(this.fillcolours[colour]);
        this.graphics.lineStyle(5, this.strokecolours[colour]);

        this.width = this.label.width + 60;
        this.height = this.label.height + 70;
        this.graphics.fillRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this.roundedCorners ? this.roundedRadius : 0);
        this.graphics.strokeRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this.roundedCorners ? this.roundedRadius : 0);
        
        this.container = this.add.container(x, y, [this.graphics, this.label]);
        // this.container.setInteractive(new Phaser.Geom.Rectangle(0, 0, w, h), Phaser.Geom.Rectangle.Contains);

        return this.container;
    }

    loadQuestion()
    {
        this.load.json('jsonTest', 'quiz/category-1.json');
        this.load.image('questionImage', 'assets/phaser3-logo.png');
        this.load.start();
        this.load.on('complete', () => {

            console.log('load complete');
            this. questionText = this.add.text(0, -300, this.cache.json.get('jsonTest').questions[0].question, {fontFamily: 'arial', fontSize: '50px'}).setOrigin(0.5, 0.5).setAlign('center');
            // this.add.image(0, 0, 'questionImage');
        })

    }

    readGamepadConfig()
    {    
        const gamepad_key = "gamepad_configuration";
        
        return JSON.parse(localStorage.getItem(gamepad_key));
    }
    /*  GAMEPAD CONFIG NAMES
    ButtonUp
    ButtonDown
    ButtonLeft
    ButtonRight
    DUp
    DDown
    DLeft
    DRight
    L1
    L2
    R1
    R2
    Select
    Start
    LStickUp
    LStickUp_direction
    LStickDown
    LStickDown_direction
    LStickLeft
    LStickLeft_direction
    LStickRight
    LStickRight_direction
    RStickUp
    RStickUp_direction
    RStickDown
    RStickDown_direction
    RStickLeft
    RStickLeft_direction
    RStickRight
    RStickRight_direction
    LStickPress
    RStickPress
    */
}