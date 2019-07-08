//stage
var map;
var wallLayer;

//sprites
var steven; //player

var crystalShrimp; //base enemy

var snacks;
var sword;

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

//movement
var tileMark = new Phaser.Point();
var turnPoint = new Phaser.Point();
var marker = new Phaser.Point();
var current = Phaser.UP;
var threshold = 3; 
var safetile = -1;
var willTurn = Phaser.NONE;
var directions = [null, null, null, null, null];
var opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ]; 

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
    invincible: false,
    snacksAdded: false,
    swordAdded: false,
    snacks: [ //add snack images to load.js
                {'levels': [1], 'name': 'cookieCat', 'value': 100}, 
                {'levels': [2], 'name': 'chaaps', 'value': 300},
                {'levels': [3,4], 'name': 'bigDonut', 'value': 500},
                {'levels': [5,6], 'name': 'apple', 'value': 700},
                {'levels': [7,8], 'name': 'pear', 'value': 1000},
                {'levels': [9,10,11,12], 'name': 'pineapple', 'value': 2000}
            ],
    
    stevenVelocity: 150,
    stevenStartingX: 32 + (stevenSize/2),
    stevenStartingY: 32 + (stevenSize/2),

    crystalShrimpPointValue: 200,
    crystalShrimpVelocity: 80,
    redCrystalShrimpVelocity: 80,
    
    //redGhostMoveDelay: 1000,
    //pinkGhostMoveDelay: 2000,
    //orangeGhostMoveDelay: 5000,
    //turquoiseGhostMoveDelay: 6000,

    invincibilityTime: 5000,
    warningTime: 3000,
    snackRespawnTime: 500,
}

function getRandomTile(){
console.log("getRandomTile call")
    var point = new Phaser.Point();
    var tileIndex;

    do{
        var randPoint = new Phaser.Point();

        randPoint.x = Math.floor(Math.random() * (384 - 1 + 1)) + 1; //random num 1-12
        randPoint.y = Math.floor(Math.random() * (512 - 1 + 1)) + 1; //randomnum 1-16

        point.x = game.math.snapToFloor(Math.floor(randPoint.x), map.tileWidth) / map.tileWidth;
        point.y = game.math.snapToFloor(Math.floor(randPoint.y), map.tileHeight) / map.tileHeight;

        console.log('snack coords: ' + point.x + ','+point.y)

        //x = 2;
        //y = 2;

       // try{
            tile = map.getTile(point.x, point.y, wallLayer, true); //wallLayer.index
            tileIndex = tile.index; //get the tile index at those coords
       // }
       // catch(e){
            //tileIndex =5; //was null
       // }
        
        console.log('tileIndex: ' + tileIndex);

        if(tileIndex === safetile){ //if that tile is a safe tile, save coords to allow snack to spawn
            tileMark.x = point.x +1;
            tileMark.y = point.y +1;
        }

    }while(tileIndex !== safetile); //keep searching for random tile until it is a safe tile
        
}

function getSnackX(){

    return (tileMark.x * 32) - (32/2); //need to convert tile coordinate to normal coordinate
}

function getSnackY(){

    return (tileMark.y * 32) - (32/2); //tile size/2 to center snack in path
}

function addSnacks() {
    if (!gameStats.snacksAdded) { //can add a condition for snacks added here
        gameStats.snacksAdded = true;
        console.log('snack added is true (addSnacks call)');
        var currentSnack = gameStats.snacks.find(snack => snack.levels.includes(gameStats.level));
        snacks = this.game.add.sprite(getSnackX(), getSnackY(), currentSnack.name); //randomly place snacks
        snacks.anchor.setTo(0.5);
        this.game.physics.arcade.enable(snacks);
    }
}

function addSword(){
    //add timer
    if(!gameStats.swordAdded){ //if theres no sword in game yet, add one
        gameStats.swordAdded = true;
        sword = this.game.add.sprite(190, 305, 'sword'); //add sword to load.js
        sword.anchor.setTo(0.5);
        this.game.physics.arcade.enable(sword);
    }
}

function pauseGame(){
    //save steven's position
    //save enemies' positions
}

function addUI() {
    scoreDisplay = this.game.add.text(game.world.centerX, 15, 'Score: ' + gameStats.score, { 'fill': 'white', 'fontSize': 16 }); //score display at top center
    
        //pause button
	    pause = this.game.add.button(360, 20, 'pause', function() {
            pauseGame();
			this.game.state.start('pause');
		});
        
        //exit button
	    exit = this.game.add.button(25, 20, 'exit', function() {
			this.game.state.start('menu');
		});

    coinsDisplay = this.game.add.text(300, 530, 'Coins: ' + gameStats.coins, { 'fill': 'white', 'fontSize': 16 }); //coins bottom right
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


