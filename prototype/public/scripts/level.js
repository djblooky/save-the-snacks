var levelState = {

    create: function () {
        this.addGraphics();
        this.addPhysics();
        this.addControls();
        addUI(); //from game.js
        //this.scaleAssets();

        getRandomTile(); //find tile for snack to spawn
        gameStats.snacksAdded = false; //snack can be added
        getSwordTile();
        gameStats.swordAdded = false;

        this.moveSteven(Phaser.DOWN);
        enemies.forEachExists(enemy => this.moveEnemy(enemy));
        
    },

    scaleAssets: function(){
        //wallLayer.scale.setTo(scaleRatio, scaleRatio);
        //groundLayer.scale.setTo(scaleRatio, scaleRatio);
       
    },

    addGraphics: function () {
        this.createStage();
        this.createPlayer();
        this.createEnemies();
        this.createAnimations();
        //this.animateEnemies();
    },

    mobilizeEnemies: function (enemy) {

        if (enemy == crystalShrimp) {
            this.game.time.events.add(gameStats.crystalShrimpMoveDelay, function () {
                enemy.body.velocity.y = gameStats.enemyVelocity; //begins moving down
                enemy.direction = 'down';
                enemy.body.velocity.x = 0;
            });
        }

        

        /*
        else if (enemy == orangeEnemy) {
            this.game.time.events.add(gameStats.orangeEnemyMoveDelay, function() {
                enemy.body.velocity.y = -gameStats.enemyVelocity;
            });
        }
        
        else if (enemy == pinkEnemy) {
            this.game.time.events.add(gameStats.pinkEnemyMoveDelay, function() {
                enemy.body.velocity.y = -gameStats.enemyVelocity;
            });
        }
        
        else {
            this.game.time.events.add(gameStats.turquoiseEnemyMoveDelay, function() {
                enemy.body.velocity.y = -gameStats.enemyVelocity;
            });
            
        } */
    },

    addPhysics: function () {
        this.game.physics.arcade.enable(steven);
        this.game.physics.arcade.enable(enemies);

        steven.body.velocity.x = gameStats.stevenVelocity;
        steven.body.immovable = true;

        enemies.setAll('body.immovable', true);
        //enemies.forEach(enemy => enemy.body.immovable.setTo(true));

        enemies.forEachExists(enemy => levelState.mobilizeEnemies(enemy));
        gameStats.inPlay = true;
    },

    addControls: function () {
        cursors = this.game.input.keyboard.createCursorKeys();
    },

    createStage: function () {
        map = this.game.add.tilemap('map');
        map.addTilesetImage('terrain', 'terrain');
        groundLayer = map.createLayer("GroundLayer");
        wallLayer = map.createLayer('WallLayer');
        map.setCollision([297, 298, 299, 329, 330, 331], true, 'WallLayer');
    },

    createPlayer: function () {
        steven = this.game.add.sprite(gameStats.stevenStartingX, gameStats.stevenStartingY, 'steven');
        steven.anchor.setTo(0.5);
    },

    createAnimations: function() {
        steven.animations.add('move', [0,1], 3, true);
        steven.animations.play('move');
        
       /* ghosts.forEach(function(ghost) {
            ghost.animations.add('move', [0,1,2,3,4,5,6,7], 2, true);
            ghost.animations.add('vulnerable', [8,9], 2, true);
            ghost.animations.add('warning', [10,11], 2, true);
            ghost.animations.add('retreat', [12,13], 2, true);
        });*/

    },

    createEnemies: function () {
        enemies = this.game.add.group();

        crystalShrimp = enemies.create(336, 48, 'shrimp'); //get random x and y
        //redCrystalShrimp = enemies.create(144, 112, 'redShrimp');

        enemies.setAll('anchor.x', 0.5);
        enemies.setAll('anchor.y', 0.5);
        enemies.setAll('frame', 0);

        enemies.forEachExists(enemy => enemy.mobilized = false);
    },

    updateStevenPosition: function () {
        stevenX = Math.round(steven.x / map.tileWidth);//remove?
        stevenY = Math.round(steven.y / map.tileHeight);

        marker.x = this.math.snapToFloor(Math.floor(steven.x), map.tileWidth) / map.tileWidth;
        marker.y = this.math.snapToFloor(Math.floor(steven.y), map.tileHeight) / map.tileHeight;

        enemies.forEachExists(function(enemy){
            enemyMark.x = game.math.snapToFloor(Math.floor(enemy.x), map.tileWidth) / map.tileWidth;
            enemyMark.y = game.math.snapToFloor(Math.floor(enemy.y), map.tileHeight) / map.tileHeight;
        });
            
    },

    wrapAround: function () {
        if (steven.right >= game.world.right && current === 2) {
            steven.right = 0;
        }
        if (steven.left <= 0 && current === 1) {
            steven.left = game.world.right;
        }

        enemies.forEachExists(function(enemy){
            if (enemy.right >= game.world.right && enemy.direction === 2) {
                enemy.right = 0;
            }
            if (enemy.left <= 0 && enemy.direction === 1) {
                enemy.left = game.world.right;
            }
        });
    },

    activateSword: function () {
        
        gameStats.swordCount--;
        gameStats.swordActivated = true;
        console.log("sword activated");

        //put enemies in vulnerable mode (state to make their sprites blink)

        this.game.time.events.add(gameStats.swordDuration, function () {
            gameStats.swordActivated = false;
            console.log("sword deactivated")
        });

        if(gameStats.swordCount <= 0){
            swordButton.destroy(); //remove sword button
            swordText.setText("");
        }
        else{
            swordText.setText("x" + gameStats.swordCount);
        }
        
    },

    createSwordButton: function() {

        swordText.setText("x" + gameStats.swordCount); //displays how many swords are remaining (next to button)

        if(gameStats.swordCount == 1){ //if there's no button already (the first sword added)
            swordButton = this.game.add.button(game.world.centerX, 520, 'swordButton', function() {
            levelState.activateSword();
        });}
    },

    collectSword: function () {
            var gotSword = false;
        
            this.game.physics.arcade.overlap(steven, sword, function () {
                sword.destroy();
                gameStats.swordCount++;
                levelState.createSwordButton();
                gotSword = true;
            });

            if (gotSword) {

                this.game.time.events.add(gameStats.swordSpawnDelay, function () {
                    gameStats.swordAdded = false;
                }); //wait for timer to respawn snack

                getSwordTile();
                //console.log('snack added is false');
            }
        
    },

    resetSteven: function () {
        steven.body.velocity.x = 0;
        steven.body.velocity.y = gameStats.stevenVelocity;
        steven.x = gameStats.stevenStartingX;
        steven.y = gameStats.stevenStartingY;
        steven.frame = 0;
    },

    resetEnemy: function (enemy) {
        switch (enemy) {
            case crystalShrimp:
                enemy.position.setTo(336, 48);
                break;
                //case orangeGhost: ghost.position.setTo(180, 255); break;
                //case pinkGhost: ghost.position.setTo(205, 255); break;
                //case turquoiseGhost: ghost.position.setTo(230, 255); break;
        }
        enemy.mobilized = false;
    },

    removeLifeIcons: function () {
        switch (gameStats.lives) {
            case 3:
                lifeIcon3.kill();
                break;
            case 2:
                lifeIcon2.kill();
                break;
            case 1:
                lifeIcon1.kill();
                break;
        }
    },

    loseLife: function () {
        levelState.resetSteven();
        enemies.forEachExists(enemy => levelState.resetEnemy(enemy));
        levelState.removeLifeIcons();
        gameStats.lives--;
        gameStats.inPlay = false;
        enemies.forEach(enemy => levelState.mobilizeEnemies(enemy));

        if (gameStats.lives == 0) {
            levelState.gameOver();
        }

        this.game.time.events.add(500, function () {
            gameStats.inPlay = true
        });
    },

    gameOver: function () {
        //steven.animations.stop();
        //enemies.forEachExists(enemy => enemy.animations.stop());
        game.state.start('results');
    },

    hitEnemy: function () {
        this.game.physics.arcade.collide(steven, enemies, function (sprite, enemy) {
            if (gameStats.inPlay) {
                if (gameStats.swordActivated) { //if player activated a sword, enemies are vulnurable
                    //enemy.animations.play('retreat');
                    levelState.resetEnemy(enemy);

                    game.time.events.add(gameStats.swordDuration, function () {
                        levelState.mobilizeEnemies(enemy);
                    });

                    gameStats.swordActivated = false;

                   // levelState.displayHitScore();

                    gameStats.coins += gameStats.enemyCoinValue;
                    gameStats.enemyCoinValue *= gameStats.multiplier;

                } else {
                    levelState.loseLife();
                }
            }
        });
    },

    hitWall: function () {
        /*  this.game.physics.arcade.collide(steven, wallLayer, function(sprite, wall) {
              steven.body.velocity.x = 0;
              steven.animations.stop();
          }, null, this);*/
        this.game.physics.arcade.collide(steven, wallLayer);

        enemies.forEachExists(function (enemy) {
            this.game.physics.arcade.collide(enemy, wallLayer);
            //console.log("enemy collision check");
        });

    },

    getEnemyVelocity: function (enemy) {
        return enemy == crystalShrimp ? gameStats.crystalShrimpVelocity : gameStats.enemyVelocity;
    },

    turnEnemies: function(){ //turn enemies on update
        enemies.forEachExists(function(enemy){

            if(levelState.enemyCanTurn(enemy)){  
                
                enemyTurn.x = (enemyMark.x * map.tileWidth) + (map.tileWidth / 2); //set enemy turn points
                enemyTurn.y = (enemyMark.y * map.tileHeight) + (map.tileHeight / 2); 
    
                //turn logic for enemy
                var ex = Math.floor(enemy.x); //get enemy's x/y coords
                var ey = Math.floor(enemy.y);
    
                //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
                if (!game.math.fuzzyEqual(ex, enemyTurn.x, threshold) || !game.math.fuzzyEqual(ey, enemyTurn.y, threshold)) { 
                    console.log('enemy too fast to turn');
                   // enemyTurnDirection = Phaser.NONE;
                    return false;
                }
    
                enemy.x = enemyTurn.x;
                enemy.y = enemyTurn.y;
                enemy.body.reset(enemyTurn.x, enemyTurn.y);
    
                levelState.moveEnemy(enemy);
    
                console.log("enemy turned " + enemyTurnDirection);
    
                enemyTurnDirection = Phaser.NONE; //resets direction to be turned to to none
    
                return true;  
        }
        }); 
    },

    coinFlip: function(){
        return Math.random() > 0.5 ? true : false;
    },

    enemyCanTurn: function(enemy){ //check if there's an available perpendicular turn path, then set the turn direction
        //Remove coin flip inside of each directional check and don't return immediately
        
       // var possibleDirections = [];

        //add possible directions to this array where you currently set enemyTurnDirections

       // var selectedDirection = Math.floor((Math.random() * possibleDirection.length)); //0-3
      //  enemyTurnDirection = possibleDirections[selectedDirection];

        if(enemy.direction == 'up' || enemy.direction == 'down'){ //if enemy is moving up or down
            if(enemyDirections[1].index === safetile){ //if left is safe
                if(this.coinFlip()){
                    enemyTurnDirection = 1; //left
                    return true;
                }}
            if(enemyDirections[2].index === safetile){//else if right is safe
                if(this.coinFlip()){
                    enemyTurnDirection = 2; //right
                    return true;
                }}
        }
            
        else if(enemy.direction == 'left' || enemy.direction == 'right'){ //if enemy is moving left or right
            if(enemyDirections[3].index === safetile){ //if up is safe
                if(this.coinFlip()){
                    enemyTurnDirection = 3; //up
                    return true;
                }}
            if(enemyDirections[4].index === safetile){//else if down is safe
                if(this.coinFlip()){
                    enemyTurnDirection = 4; //down
                    return true;
                }}
        }

        return false;

/* steven's check for turn
        if (willTurn === turnDirection || directions[turnDirection] === null || directions[turnDirection].index !== safetile) {
            //  Invalid direction if they're already set to turn that way
            //  Or there is no tile there, or the tile isn't index a floor tile
            return;
        }

        if (current === opposites[turnDirection]) //check for turn around
        {
            this.moveSteven(turnDirection);
        } else //if turning, set turn direction and turn points
        {
            willTurn = turnDirection;
            turnPoint.x = (marker.x * map.tileWidth) + (map.tileWidth / 2); //check
            turnPoint.y = (marker.y * map.tileHeight) + (map.tileHeight / 2); //check
        }*/ 
    },

    moveEnemy: function (enemy) {

        //console.log("moving " + direction);

        enemy.direction = enemyTurnDirection;

        switch (enemyTurnDirection) {
            case 4: //down
                enemy.body.velocity.x = 0;
                enemy.body.velocity.y = this.getEnemyVelocity(enemy);
                break;
            case 3: //up
                enemy.body.velocity.x = 0;
                enemy.body.velocity.y = -(this.getEnemyVelocity(enemy));
                break;
            case 1: //left
                enemy.body.velocity.y = 0;
                enemy.body.velocity.x = -(this.getEnemyVelocity(enemy));
                break;
            case 2: //right
                enemy.body.velocity.y = 0;
                enemy.body.velocity.x = this.getEnemyVelocity(enemy);
                break;
        }

        //rotation
        //this.add.tween(steven).to( { angle: this.getAngle(direction) }, this.turnSpeed, "Linear", true);
        //current = direction;

    },

    getMoveKey: function () {

        if (cursors.left.isDown) {
            return (Phaser.LEFT);
        } else if (cursors.right.isDown) {
            return (Phaser.RIGHT);
        } else if (cursors.up.isDown) {
            return (Phaser.UP);
        } else if (cursors.down.isDown) {
            return (Phaser.DOWN);
        }
    },

    checkForTurn: function (turnDirection) {

        if (willTurn === turnDirection || directions[turnDirection] === null || directions[turnDirection].index !== safetile) {
            //  Invalid direction if they're already set to turn that way
            //  Or there is no tile there, or the tile isn't index a floor tile
            return;
        }

        if (current === opposites[turnDirection]) //check for turn around
        {
            this.moveSteven(turnDirection);
        } else //if turning, set turn direction and turn points
        {
            willTurn = turnDirection;
            turnPoint.x = (marker.x * map.tileWidth) + (map.tileWidth / 2); //check
            turnPoint.y = (marker.y * map.tileHeight) + (map.tileHeight / 2); //check
        }
    },

    turnSteven: function () {
        var sx = Math.floor(steven.x); //get steven's x/y coords
        var sy = Math.floor(steven.y);

        //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
        if (!this.math.fuzzyEqual(sx, turnPoint.x, threshold) || !this.math.fuzzyEqual(sy, turnPoint.y, threshold)) {
            return false;
        }

        steven.x = turnPoint.x;
        steven.y = turnPoint.y;
        steven.body.reset(turnPoint.x, turnPoint.y);

        this.moveSteven(willTurn);

        //console.log("turned " + willTurn)

        willTurn = Phaser.NONE; //resets direction to be turned to to none

        return true;
    },

     getAngle: function (to) {
            //  About-face?
            if (current === opposites[to])
            {
                return "180";
                //steven.setScale(-1);
            }
            if ((current === Phaser.UP && to === Phaser.LEFT) ||
                (current === Phaser.DOWN && to === Phaser.RIGHT) ||
                (current === Phaser.LEFT && to === Phaser.DOWN) ||
                (current === Phaser.RIGHT && to === Phaser.UP))
            {
                return "-90";
            }
            return "90";
        },

    moveSteven: function (direction) {

        //console.log("moving " + direction);

        //steven.direction = direction;
        current = direction;

        switch (direction) {
            case 4: //down
                steven.body.velocity.x = 0;
                steven.body.velocity.y = gameStats.stevenVelocity;
                break;
            case 3: //up
                steven.body.velocity.x = 0;
                steven.body.velocity.y = -(gameStats.stevenVelocity);
                break;
            case 1: //left
                steven.body.velocity.y = 0;
                steven.body.velocity.x = -(gameStats.stevenVelocity);
                break;
            case 2: //right
                steven.body.velocity.y = 0;
                steven.body.velocity.x = gameStats.stevenVelocity;
                break;
        }

        //rotation
        this.add.tween(steven).to( { angle: this.getAngle(direction) }, turnSpeed, "Linear", true);
        current = direction;

    },

    updateGridSensors: function () {
        directions[1] = map.getTileLeft(wallLayer.index, marker.x, marker.y);
        directions[2] = map.getTileRight(wallLayer.index, marker.x, marker.y);
        directions[3] = map.getTileAbove(wallLayer.index, marker.x, marker.y);
        directions[4] = map.getTileBelow(wallLayer.index, marker.x, marker.y);

        enemyDirections[1] = map.getTileLeft(wallLayer.index, enemyMark.x, enemyMark.y);
        enemyDirections[2] = map.getTileRight(wallLayer.index, enemyMark.x, enemyMark.y);
        enemyDirections[3] = map.getTileAbove(wallLayer.index, enemyMark.x, enemyMark.y);
        enemyDirections[4] = map.getTileBelow(wallLayer.index, enemyMark.x, enemyMark.y);
    },

    collectSnack: function () {
        var gotSnack = false;
        if (snacks) {
            this.game.physics.arcade.overlap(steven, snacks, function () {
                snacks.destroy();
                var currentsnack = gameStats.snacks.find(snacks => snacks.levels.includes(gameStats.level));
                gameStats.score += currentsnack.value;
                snackScore = game.add.text(getSnackX(), getSnackY() - 15, currentsnack.value, {
                    'fill': 'white',
                    'fontSize': 15
                });
                snackScore.anchor.setTo(0.5);
                snackScore.lifespan = 500;
                gotSnack = true;
            });

            if (gotSnack) {

                this.game.time.events.add(gameStats.snackRespawnTime, function () {
                    gameStats.snacksAdded = false;
                }); //wait for timer to respawn snack
                getRandomTile();
                //console.log('snack added is false');
            }
        }
    },

    updateScore: function () {
        scoreDisplay.setText('Score: ' + gameStats.score);
        coinsDisplay.setText(Math.ceil(gameStats.coins));
        //highScoreDisplay.setText('High Score: ' + Math.max(gameStats.score, gameStats.highScore));
        if (gameStats.score >= 10000 && !gameStats.livesEarned) {
            extraLife();
        }
    },

    update: function () {
        if (gameStats.inPlay) {

            this.updateStevenPosition();
            this.updateGridSensors();

            if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown) {
                this.checkForTurn(this.getMoveKey()); //only move while move keys are pressed
            }

            if (willTurn !== Phaser.NONE) //if a turn direction has been set, turn
            {
                this.turnSteven();
            }

            if (enemyTurnDirection !== Phaser.NONE){
                this.turnEnemies();
            }

            this.wrapAround();
            this.hitWall();
            //console.log(stevenX + ", " + stevenY);
            this.updateScore();
        }

        addSnacks();
        addSword();
        this.hitEnemy();
        this.collectSnack();
        this.collectSword();
    },

}