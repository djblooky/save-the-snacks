var config = {
    type: Phaser.AUTO, //automatically sets rendering context 
    width: 1024,
    height: 512,

    physics: {
        default:'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },

};

var game = new Phaser.Game(config);

function preload() //loads on game start 
{
    this.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tiles', 'assets/tiles.png');
    this.load.image('car', 'assets/car.png');
}

function create(){
    this.map = this.add.tilemap('map');
    this.map.addTilesetImage('tiles', 'tiles');
    this.layer = this.map.createLayer('Tile Layer 2');
    this.map.setCollision(20, true, this.layer);

    this.car = this.add.sprite(48, 48, 'car');
    this.car.anchor.set(0.5);

    this.physics.arcade.enable(this.car);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.move(Phaser.DOWN);
}

function update(){
    this.physics.arcade.collide(this.car, this.layer);
}
