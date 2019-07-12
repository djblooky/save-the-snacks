var buildNumber = 3;

//stage
var map;
var wallLayer;

//sprites
var steven; //player

var enemies; //group for all enemies
var crystalShrimp; //base enemy
//var redCrystalShrimp;

var snacks;
var sword;
var swordButton;

//UI Elements
var scoreDisplay;
var highScoreDisplay;
var lifeIcon1;
var lifeIcon2;
var lifeIcon3;
var lifeIcon4;

//text
var snackScore;

//steven
var stevenX, stevenY; //player coordinates
var stevenSize = 32; //sprite width and height

//collectables
var tileMark = new Phaser.Point(); //snack tile
var swordTile = new Phaser.Point();

//player movement
var turnPoint = new Phaser.Point();
var marker = new Phaser.Point();
var current = Phaser.UP;
var threshold = 3;
var safetile = -1;
var willTurn = Phaser.NONE;
var directions = [null, null, null, null, null];
var opposites = [Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP];

//enemy movement
var enemyDirections = [null, null, null, null, null];
var enemyMark = new Phaser.Point();
var enemyMoving = false;
var enemyTurning = false;
var x = 0;
var y = 0;

//timers
//var snackTimer = new Timer(game, autoDestroy);

var gameStats = {
    score: 0,
    coins: 0,
    highScore: localStorage['stevenHighScore'] || 0,
    level: 1,
    lives: 3,
    livesEarned: 0,
    inPlay: false,
    swordActivated: false,
    swordDuration: 3000,
    swordSpawnDelay: 1000,
    swordCount = 0,
    snacksAdded: false,
    swordAdded: false,
    snacks: [ //add snack images to load.js
        {
            'levels': [1],
            'name': 'cookieCat',
            'value': 100
        },
        {
            'levels': [1],
            'name': 'chaaps',
            'value': 300
        },
        {
            'levels': [1],
            'name': 'bigDonut',
            'value': 500
        }
        //{'levels': [1], 'name': 'sword', 'value': 700}
    ],

    stevenVelocity: 150,
    stevenStartingX: 32 + (stevenSize / 2),
    stevenStartingY: 32 + (stevenSize / 2),

    enemyCoinValue: 200,
    multiplier: 2,

    crystalShrimpVelocity: 80,
    enemyVelocity: 80,

    crystalShrimpMoveDelay: 1000,

    invincibilityTime: 5000,
    warningTime: 3000,
    snackRespawnTime: 500,
}

function getRandomTile() {
    //console.log("getRandomTile call")
    var point = new Phaser.Point();
    var tileIndex;

    do {
        var randPoint = new Phaser.Point();

        randPoint.x = Math.floor(Math.random() * (384 - 1 + 1)) + 1; //random num 1-12
        randPoint.y = Math.floor(Math.random() * (512 - 1 + 1)) + 1; //randomnum 1-16

        point.x = game.math.snapToFloor(Math.floor(randPoint.x), map.tileWidth) / map.tileWidth;
        point.y = game.math.snapToFloor(Math.floor(randPoint.y), map.tileHeight) / map.tileHeight;

        //console.log('snack coords: ' + point.x + ','+point.y)

        tile = map.getTile(point.x, point.y, wallLayer, true); //wallLayer.index
        tileIndex = tile.index; //get the tile index at those coords

        //console.log('tileIndex: ' + tileIndex);

        if (tileIndex === safetile) { //if that tile is a safe tile, save coords to allow snack to spawn
            tileMark.x = point.x + 1;
            tileMark.y = point.y + 1;
        }

    } while (tileIndex !== safetile); //keep searching for random tile until it is a safe tile

}

function getSwordTile(){
    var swordPoint = new Phaser.Point();
    var tileIndex;

    do {
        var randPoint = new Phaser.Point();

        randPoint.x = Math.floor(Math.random() * (384 - 1 + 1)) + 1; //random num 1-12
        randPoint.y = Math.floor(Math.random() * (512 - 1 + 1)) + 1; //randomnum 1-16

        swordPoint.x = game.math.snapToFloor(Math.floor(randPoint.x), map.tileWidth) / map.tileWidth;
        swordPoint.y = game.math.snapToFloor(Math.floor(randPoint.y), map.tileHeight) / map.tileHeight;

        tile = map.getTile(swordPoint.x, swordPoint.y, wallLayer, true); //wallLayer.index
        tileIndex = tile.index; //get the tile index at those coords

        if (tileIndex === safetile) { //if that tile is a safe tile, save coords to allow snack to spawn
            swordTile.x = x + 1;
            swordTile.y = y + 1;
        }

    } while(tileIndex !== safetile);
}

function getSnackX() {

    return (tileMark.x * 32) - (32 / 2); //need to convert tile coordinate to normal coordinate
}

function getSnackY() {

    return (tileMark.y * 32) - (32 / 2); //tile size/2 to center snack in path
}

function getSwordX() {

    return (swordTile.x * 32) - (32 / 2); //need to convert tile coordinate to normal coordinate
}

function getSwordY() {

    return (swordTile.y * 32) - (32 / 2); //tile size/2 to center snack in path
}

function addSnacks() {
    if (!gameStats.snacksAdded) { //can add a condition for snacks added here
        gameStats.snacksAdded = true;
        //console.log('snack added is true (addSnacks call)');
        var currentSnack = gameStats.snacks.find(snack => snack.levels.includes(gameStats.level));
        snacks = this.game.add.sprite(getSnackX(), getSnackY(), currentSnack.name); //randomly place snacks
        snacks.anchor.setTo(0.5);
        this.game.physics.arcade.enable(snacks);
    }
}

function addSword() {
    
        if (!gameStats.swordAdded) { //if theres no sword in game yet, add one
            gameStats.swordAdded = true;
            sword = this.game.add.sprite(getSwordX(), getSwordY(), 'sword'); //add sword to load.js
            sword.anchor.setTo(0.5);
            this.game.physics.arcade.enable(sword);
        } 
}

function pauseGame() {
    //save steven's position
    //save enemies' positions
    //save snacks' positions
}

function addUI() {
    scoreDisplay = this.game.add.text(game.world.centerX, 15, 'Score: ' + gameStats.score, {
        'fill': 'white',
        'fontSize': 16
    }); //score display at top center

    //pause button
    pause = this.game.add.button(360, 20, 'pause', function () {
        pauseGame();
        this.game.state.start('pause');
    });

    //exit button
    exit = this.game.add.button(25, 20, 'exit', function () {
        this.game.state.start('menu');
    });

    coinsDisplay = this.game.add.text(300, 530, 'Coins: ' + gameStats.coins, {
        'fill': 'white',
        'fontSize': 16
    }); //coins bottom right
    lifeIcon1 = this.game.add.sprite(25, 530, 'life-icon'); //life icons bottom left
    lifeIcon2 = this.game.add.sprite(45, 530, 'life-icon');
    lifeIcon3 = this.game.add.sprite(65, 530, 'life-icon');

    [scoreDisplay, coinsDisplay, lifeIcon1, lifeIcon2, lifeIcon3, pause, exit].forEach(s => s.anchor.setTo(0.5));
}

function addLifeIcons() {
    switch (gameStats.lives) {
        case 1:
            lifeIcon2 = this.game.add.sprite(45, 530, 'life-icon');
            lifeIcon2.anchor.setTo(0.5);
            break;
        case 2:
            lifeIcon3 = this.game.add.sprite(65, 530, 'life-icon');
            lifeIcon3.anchor.setTo(0.5);
            break;
        case 3:
            lifeIcon4 = this.game.add.sprite(85, 530, 'life-icon');
            lifeIcon4.anchor.setTo(0.5);
            break;
    }
}

function extraLife() {
    addLifeIcons();
    gameStats.lives++;
    gameStats.livesEarned++;
}