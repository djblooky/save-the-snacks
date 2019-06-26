var platforms;
var player;

class level1 extends Phaser.Scene{
    constructor(){
        super({key:"level1"});
    }

    preload() //loads on game start 
    {
        this.load.image('background', 'assets/background.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        //load more images here
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
    }

    create()
    {
        this.add.image(0,0,'background').setOrigin(0,0); //stop image origin from defaulting at the center
        
        platforms = this.physics.add.staticGroup(); //group for platforms

        //add platforms
        platforms.create(500, 510, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        //player stuff
        player = this.physics.add.sprite(500,440, 'dude');

        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        //animation
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(player, platforms); //collision
    }

    update()
    {
        
    }
}