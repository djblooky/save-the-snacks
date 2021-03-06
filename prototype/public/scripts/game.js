var buildNumber = 5;
//var scaleRatio = window.devicePixelRatio / 3;

var gameMusic;

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

//UI Elements
var swordButton;
var lifeIcon1;
var lifeIcon2;
var lifeIcon3;
var lifeIcon4;

//text
var snackScore;
var swordText;
var swordActiveText;
var scoreDisplay;
var highScoreDisplay;
var coinsDisplay;

//steven
var stevenX, stevenY; //player coordinates
var stevenSize = 32; //sprite width and height

//collectables
var tileMark = new Phaser.Point(); //snack tile
var swordTile = new Phaser.Point();

//player movement
var moving = false;
var turnPoint = new Phaser.Point();
var marker = new Phaser.Point();
var turnSpeed = 150;
var current = Phaser.UP;
var threshold = 3;
var safetile = -1;
var willTurn = Phaser.NONE;
var directions = [null, null, null, null, null];
var opposites = [Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP];

//time
var enemyTurnDelay = 200;
var enemySpawnDelay = 10000;
var spawned = false;

//timers
//var snackTimer = new Timer(game, autoDestroy);

var gameStats;

var savedCoins = 0;
var highScore = 0;

function setGameStats(){
gameStats = {
    score: 0,
    coins: 0,
    sfxEnabled: true,
    musicEnabled: true,
    //highScore: localStorage['stevenHighScore'] || 0,
    level: 1,
    lives: 3,
    livesEarned: 0,
    inPlay: false,
    swordActivated: false,
    swordDuration: 5000,
    swordSpawnDelay: 8000,
    swordCount: 0,
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

    enemyCoinValue: 10,
    multiplier: 1.2,

    crystalShrimpVelocity: 80,
    enemyVelocity: 80,

    crystalShrimpMoveDelay: 1000,

    invincibilityTime: 5000,
    warningTime: 3000,
    snackRespawnTime: 500,

    swordCost: 25,
    amethystCost: 50,
    pearlCost: 100,
    garnetCost: 150,

    swordUpgradeValue: 2000,
}
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
        if(tile === null){
            return;
        }
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
        if(tile === null){
            return;
        }
        tileIndex = tile.index; //get the tile index at those coords

        if (tileIndex === safetile) { //if that tile is a safe tile, save coords to allow snack to spawn
            swordTile.x = swordPoint.x + 1;
            swordTile.y = swordPoint.y + 1;
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
        snacks.animations.add('hover', [0,1,2,3], 3, true);
        snacks.animations.play('hover');
        this.game.physics.arcade.enable(snacks);
    }
}

function addSword() {
    if (!gameStats.swordAdded) { //if theres no sword in game yet, add one
        gameStats.swordAdded = true;
        sword = this.game.add.sprite(getSwordX(), getSwordY(), 'sword'); //add sword to load.js
        sword.anchor.setTo(0.5);
        sword.animations.add('hover', [0,1,2,3], 3, true);
        sword.animations.play('hover');
        this.game.physics.arcade.enable(sword);
    } 
}

function pauseGame() {
    
    addPauseBackground();
    addPauseText();
    addPauseButtonUI();
    openWindow();
    
    //disable sword spawning
    //disable snack spawning
    //disable enemy movement
    //disable steven movement
    //disable game buttons
    //pause sword duration
}

function addUI() {
    scoreText = this.game.add.image(game.world.centerX, 15, 'scoreText');
    scoreDisplay = this.game.add.text(game.world.centerX + 45, 5, gameStats.score, {
        'fill': 'white',
        'fontSize': 20
    }); //score display at top center

    //pause button
    pause = this.game.add.button(360, 25, 'pause', function () {
        pauseGame();
        this.game.state.start('pause');
    },this,0,1);

    //exit button
    exit = this.game.add.button(25, 25, 'exit', function () {
        this.game.state.start('menu');
    }, this, 0, 1);

    coinIcon = this.game.add.image(310, 530, 'coin');
    coinsDisplay = this.game.add.text(325, 520, gameStats.coins, {
        'fill': 'white',
        'fontSize': 20
    }); //coins bottom right

    swordText = game.add.text(game.world.centerX + 40, 535, "", { 
        'fill': 'white',
        'fontSize': 14
    });

    swordStatus = game.add.text(game.world.centerX , 500, "", { 
        'fill': 'white',
        'fontSize': 14
    });

    lifeIcon1 = this.game.add.sprite(25, 530, 'life-icon'); //life icons bottom left
    lifeIcon2 = this.game.add.sprite(45, 530, 'life-icon');
    lifeIcon3 = this.game.add.sprite(65, 530, 'life-icon');

    [scoreText, swordText, swordStatus, coinIcon, lifeIcon1, lifeIcon2, lifeIcon3, pause, exit].forEach(s => s.anchor.setTo(0.5));
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
        //case 4:
           // lifeIcon5
    }
}

function extraLife() {
    addLifeIcons();
    gameStats.lives++;
    gameStats.livesEarned++;
}