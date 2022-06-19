import eventsCenter from "../eventsCenter.js";

export default class questionSelect extends Phaser.Scene
{
    constructor()
    {
        super('question-select');
    }

    preload()
    {

    }

    create()
    {
        this.createButton(0, 0, 'test button').on('pointerdown', () => {

            console.log('ey');
        });

        // ADPATIVE DISPLAY

        this.cameras.main.centerOn(0, 0);
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