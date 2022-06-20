import eventsCenter from "../eventsCenter.js";

/** @author BobbyBurt */
export default class questionSelect extends Phaser.Scene
{
    constructor()
    {
        super('question-select');

        /** this must be updated to accurately reflect quiz json and other assets.
         * order will be perserved in game
         * @readonly
         */
        this.categoryNames = ['games', 'videos', 'music'];
    }

    init(data)
    {
        /** determines which categories are used 
        * @readonly
        */
        this.round = data.round;
    }

    preload()
    {
        // LOAD CATEGORIES

        for (const _category of this.categoryNames) {

            this.load.json(_category, 'quiz/' + _category + '.json',);
        }
        
    }

    create()
    {
        
            
        this.createButton(0, 0, element).on('pointerdown', () => {

            console.log(element);
        });   

        this.load.on('complete', () => {

            console.log('load complete');
            // this.questionText = this.add.text(0, -300, this.cache.json.get('jsonTest').questions[0].question, {fontFamily: 'arial', fontSize: '50px'}).setOrigin(0.5, 0.5).setAlign('center');
            // this.add.image(0, 0, 'questionImage');
        })


        // ADPATIVE DISPLAY

        this.cameras.main.centerOn(0, 0);
    }

    /**  */
    loadCategory(_categoryName)
    {
        this.load.json(_categoryName, 'quiz/' + _categoryName + '.json');
        // this.load.image('questionImage', 'assets/phaser3-logo.png');
        this.load.start();

    }

    loadCategoryAssets(_categoryName)
    {

    }

    createButton(x, y, label)
    {
        // SETTINGS
        this.roundedCorners = true;
        this.roundedRadius = 15;

        this.graphics = this.add.graphics();
        this.label = this.add.text(0, 0, label, {color: 'white', fontSize: '35px', fontFamily: 'arial'}).setAlign('center').setOrigin(0.5, 0.5);
        this.graphics.fillStyle(0x039347);
        this.graphics.lineStyle(5, 0x04af54);

        this.width = this.label.width + 60;
        this.height = this.label.height + 70;
        this.graphics.fillRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this.roundedRadius);
        this.graphics.strokeRoundedRect(-this.width / 2, -this.height / 2, this.width, this.height, this.roundedRadius);
        
        this.container = this.add.container(x, y, [this.graphics, this.label]);
        this.container.setInteractive(new Phaser.Geom.Rectangle(-this.width / 2, -this.height / 2, this.width, this.height), Phaser.Geom.Rectangle.Contains);

        return this.container;
    }
}