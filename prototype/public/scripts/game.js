var buildNumber = 2;

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

//steven
var stevenX, stevenY; //player coordinates
var stevenSize = 32; //sprite width and height

//movement
var turnPoint = new Phaser.Point();
var marker = new Phaser.Point();
var current = Phaser.UP;
var threshold = 3; 
var safetile = -1;
var willTurn = Phaser.NONE;
var directions = [null, null, null, null, null];
var opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ]; 

//timers

var gameStats = {
    score: 0,
    highScore: localStorage['stevenHighScore'] || 0,
    level: 1,
    lives: 3,
    livesEarned: 0,
    inPlay: false,
    invincible: false,
    snacksAdded: false,
    swordAdded: false,
    snacks: [ //add snack images to load.js
                {'levels': [1], 'name': 'bigDonut', 'value': 100}, 
                {'levels': [2], 'name': 'chaaps', 'value': 300},
                {'levels': [3,4], 'name': 'orange', 'value': 500},
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
    //dotsLeft: 205
}

function addSnacks() {
    if (!gameStats.snacksAdded) { //can add a condition for snacks added here
        gameStats.snacksAdded = true;
        var currentSnack = gameStats.snacks.find(snack => snack.levels.includes(gameStats.level));
        snacks = this.game.add.sprite(190, 305, currentSnack.name); 
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

//remove high score?
function loadScoreBoard() {
    scoreDisplay = this.game.add.text(50, 25, 'Score: ' + gameStats.score, { 'fill': 'white', 'fontSize': 16 });
    highScoreDisplay = this.game.add.text(200, 25, 'High Score: ' + gameStats.score, { 'fill': 'white', 'fontSize': 16 });
    lifeIcon1 = this.game.add.sprite(25, 530, 'life-icon');
    lifeIcon2 = this.game.add.sprite(45, 530, 'life-icon');
    lifeIcon3 = this.game.add.sprite(65, 530, 'life-icon');
    
    [scoreDisplay, highScoreDisplay, lifeIcon1, lifeIcon2, lifeIcon3].forEach(s => s.anchor.setTo(0.5));
}

function addLifeIcons() {
    switch (gameStats.lives) {
        case 1:
            lifeIcon2 = this.game.add.sprite(45, 540, 'life-icon');
            lifeIcon2.anchor.setTo(0.5);
            break;
        case 2:
            lifeIcon3 = this.game.add.sprite(65, 540, 'life-icon');
            lifeIcon3.anchor.setTo(0.5);
            break;
        case 3:
            lifeIcon4 = this.game.add.sprite(85, 540, 'life-icon');
            lifeIcon4.anchor.setTo(0.5);
            break;
    }
}

function extraLife() {
	addLifeIcons();
	gameStats.lives++;
	gameStats.livesEarned++;
}


