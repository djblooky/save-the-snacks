var levelState = {

    create: function() {
        this.addGraphics();
        this.addPhysics();
        this.addControls();
        addUI(); //from game.js

        getRandomTile(); //find tile for snack to spawn
        gameStats.snacksAdded = false; //snack can be added

        this.moveSteven(Phaser.DOWN);
    },

    addGraphics: function(){
        this.createStage();
        this.createPlayer();
        this.createEnemies();
        //this.addAnimations();
        //this.animateEnemies();
    },

    mobilizeEnemies: function(enemy) {

        if (enemy == crystalShrimp) {
            this.game.time.events.add(gameStats.crystalShrimpMoveDelay, function() {
                enemy.body.velocity.y = gameStats.enemyVelocity; //begins moving down
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

        enemy.direction = 'up';
        enemy.body.velocity.x = 0;

    },

    addPhysics : function(){
        this.game.physics.arcade.enable(steven);
        this.game.physics.arcade.enable(enemies);

        steven.body.velocity.x = gameStats.stevenVelocity;
        steven.body.immovable = true;
        
        enemies.setAll('body.immovable', true);
        //enemies.forEach(enemy => enemy.body.immovable.setTo(true));
        
        enemies.forEachExists(enemy => levelState.mobilizeEnemies(enemy));
        gameStats.inPlay = true;
        },

        addControls: function(){
            cursors = this.game.input.keyboard.createCursorKeys();
        },

    createStage: function() {
        map = this.game.add.tilemap('map');
        map.addTilesetImage('terrain', 'terrain');
        groundLayer = map.createLayer("GroundLayer");
        wallLayer = map.createLayer('WallLayer');
        map.setCollision([297,298,299,329,330,331], true, 'WallLayer');
    },

    createPlayer: function(){
        steven = this.game.add.sprite(gameStats.stevenStartingX, gameStats.stevenStartingY, 'steven');
        steven.anchor.setTo(0.5);
    },

    createEnemies: function(){
        enemies = this.game.add.group();

        crystalShrimp = enemies.create(336, 48, 'shrimp'); //get random x and y
        //redCrystalShrimp = enemies.create(144, 112, 'redShrimp');

        enemies.setAll('anchor.x', 0.5);
        enemies.setAll('anchor.y', 0.5);
        enemies.setAll('frame', 0);
        
        enemies.forEachExists(enemy => enemy.mobilized = false);
    },

    updateStevenPosition: function() {
        stevenX = Math.round(steven.x / map.tileWidth);
        stevenY = Math.round(steven.y / map.tileHeight);

        marker.x = this.math.snapToFloor(Math.floor(steven.x), map.tileWidth) / map.tileWidth;
        marker.y = this.math.snapToFloor(Math.floor(steven.y), map.tileHeight) / map.tileHeight;
    },

    wrapAround: function() {
        if (steven.right >= game.world.right && current === 2) {
            steven.right = 0;
        }
        if (steven.left <= 0 && current === 1) {
            steven.left = game.world.right;
        }
    },

    createSwordButton(){
        //button = new button
            //this.activateSword()
    },

    collectSword: function(){
        //if colliding with sword sprite
            //this.createSwordButton()
            //create button on dock that
    },

    activateSword: function(){
        gameStats.swordActivated = true;
        //put enemies in vulnerable mode
    },

    resetSteven: function() {
        steven.body.velocity.x = 0;
        steven.body.velocity.y = gameStats.stevenVelocity;
        steven.x = gameStats.stevenStartingX;
        steven.y = gameStats.stevenStartingY;
        steven.frame = 0;
    },
    
    resetEnemy: function(enemy) {
        switch (enemy) {
            case crystalShrimp: enemy.position.setTo(336, 48); break;
            //case orangeGhost: ghost.position.setTo(180, 255); break;
            //case pinkGhost: ghost.position.setTo(205, 255); break;
            //case turquoiseGhost: ghost.position.setTo(230, 255); break;
        }
        enemy.mobilized = false;
    },
    
    removeLifeIcons: function() {
        switch (gameStats.lives) {
            case 3: lifeIcon3.kill(); break;
            case 2: lifeIcon2.kill(); break;
            case 1: lifeIcon1.kill(); break;
        }
    },

    loseLife: function() {
        levelState.resetSteven();
        enemies.forEachExists(enemy => levelState.resetEnemy(enemy));
        levelState.removeLifeIcons();
        gameStats.lives--;
        gameStats.inPlay = false;
        enemies.forEach(enemy => levelState.mobilizeEnemies(enemy));
        
        if (gameStats.lives == 0) {
            levelState.gameOver();
        }
        
        this.game.time.events.add(500, function() { gameStats.inPlay = true });
    },

    gameOver: function() {
        steven.animations.stop();
        enemies.forEachExists(enemy => enemy.animations.stop());
        game.state.start('results');
    },

    hitEnemy: function() {
        this.game.physics.arcade.collide(steven, enemies, function(sprite, enemy) {
            if (gameStats.inPlay) {
                if (gameStats.swordActivated) { //if player activated a sword, enemies are vulnurable
                    //enemy.animations.play('retreat');
                    levelState.resetEnemy(enemy);
                    
                    game.time.events.add(swordDuration, function() {
                        levelState.mobilizeEnemies(enemy);
                    });

                    gameStats.swordActivated = false;
                    
                    levelState.displayHitScore();
                    
                    gameStats.coins += gameStats.enemyCoinValue;
                    gameStats.enemyCoinValue *= multiplier;

                }
                else {
                    levelState.loseLife();
                }
            }
        });
    },

    hitWall: function() {
      /*  this.game.physics.arcade.collide(steven, wallLayer, function(sprite, wall) {
            steven.body.velocity.x = 0;
            steven.animations.stop();
        }, null, this);*/
        this.game.physics.arcade.collide(steven, wallLayer);

        enemies.forEachExists(function(enemy){
            this.game.physics.arcade.collide(enemy, wallLayer);
            //console.log("enemy collision check");
        });
        
    },

    getEnemyVelocity: function(enemy) {
        return enemy == crystalShrimp ? gameStats.crystalShrimpVelocity : gameStats.enemyVelocity;
    },

    decideEnemyMovement: function(enemy) {
                   

        if (enemy.direction == 'up' ) { //and up is a possible enemyDirection
            y = 1;
            
        }
        
        else if (enemy.direction == 'down') { //and down is a possible enemyDirection
            y = -1;
        }
        
        else if (enemy.direction == 'left') { //and left is a possible enemyDirection
            x = 1;
        }
        
        else { //and right is a possible enemyDirection
            x = -1;
        }
        //else x,y = 0?
    },

    enemyUpdate: function(enemy){
        
        if(enemy.direction == 'up' || enemy.direction == 'down'){
            enemy.y += y;
        }
        else if(enemy.direction == 'left' || enemy.direction == 'right'){
            enemy.x += x;
        }
     
        if(enemyTurning){
            enemyTurning = false;
            var turn = new Phaser.Point();
            turn.x = (enemyMark.x * map.tileWidth) + (map.tileWidth / 2); //check
            turn.y = (enemyMark.y * map.tileHeight) + (map.tileHeight / 2); //check

            //turn logic for enemy
            var ex = Math.floor(enemy.x); //get steven's x/y coords
            var ey = Math.floor(enemy.y);

            //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
            if (!this.math.fuzzyEqual(ex, turn.x, threshold) || !this.math.fuzzyEqual(ey, turn.y, threshold))
            {
                return false;
            }

            enemy.x = turn.x;
            enemy.y = turn.y;
            enemy.body.reset(turn.x, turn.y);

            //this.moveSteven(enemyTurning);

            //console.log("turned " + willTurn)

            //willTurn = Phaser.NONE; //resets direction to be turned to to none

            return true;
        }
    },

    moveEnemies: function() {
        enemies.forEachExists(function(enemy) {
            
            if (enemy.y >= 55) {
                enemy.mobilized = true;
            }
            
            if (enemy.mobilized && !enemyMoving) {

                enemyMoving = true;
                var delay = 1000;
                enemyTurning = true;

                this.game.time.events.add(delay, function(){ //wait x seconds before trying to move a new direction

                    enemyMark.x = game.math.snapToFloor(Math.floor(enemy.x), map.tileWidth) / map.tileWidth;
                    enemyMark.y = game.math.snapToFloor(Math.floor(enemy.y), map.tileHeight) / map.tileHeight;
                    console.log(enemyMark.x + "," +enemyMark.y);

                    if(enemyDirections['left'].index == safetile){ //move if there are safe tiles around
                        
                        levelState.decideEnemyMovement(enemy);
                        var direction = Math.random() > 0.5 ? 'left' : enemy.direction; //50% chance to turn or keep goin
                        var enemyVelocity = levelState.getEnemyVelocity();
                        enemy.body.velocity.y = direction == 'left' ? 0 : 0; ///remove the else?
                        enemy.body.velocity.x = direction == 'left' ? -enemyVelocity : 0;
                        enemy.direction = direction;
                        
                        
                      }
                      else if(map.getTileRight(wallLayer.index, enemyMark.x+1, enemyMark.y+1).index == safetile){
                        
                        levelState.decideEnemyMovement(enemy);
                        var direction = Math.random() > 0.5 ? 'right' : enemy.direction; //50% chance to turn or keep goin
                        var enemyVelocity = levelState.getEnemyVelocity();
                        enemy.body.velocity.y = direction == 'right' ? 0 : 0;
                        enemy.body.velocity.x = direction == 'right' ? enemyVelocity : 0;
                        enemy.direction = direction;

                      }
                      else if(map.getTileAbove(wallLayer.index, enemyMark.x + 1, enemyMark.y +1).index == safetile){
                        levelState.decideEnemyMovement(enemy);
                        var direction = Math.random() > 0.5 ? 'up' : enemy.direction; //50% chance to turn or keep goin
                        var enemyVelocity = levelState.getEnemyVelocity();
                        enemy.body.velocity.y = direction == 'up' ? enemyVelocity : 0;
                        enemy.body.velocity.x = direction == 'up' ? 0 : 0;
                        enemy.direction = direction;

                      }
                      else if(map.getTileBelow(wallLayer.index, enemyMark.x + 1, enemyMark.y + 1).index == safetile){
                        
                        levelState.decideEnemyMovement(enemy);
                        var direction = Math.random() > 0.5 ? 'down' : enemy.direction; //50% chance to turn or keep goin
                        var enemyVelocity = levelState.getEnemyVelocity();
                        enemy.body.velocity.y = direction == 'down' ? -enemyVelocity : 0;
                        enemy.body.velocity.x = direction == 'down' ? 0: 0;
                        enemy.direction = direction;

                      }
                      /*
                      else{ //turn on collision if not at paths
                          this.game.physics.arcade.collide(enemy, wallLayer, this.decideEnemyMovement());
                      }  */
                      enemyMoving = false;
                });      
            }
        });
    },

    getMoveKey: function(){

        if (cursors.left.isDown)
            {
                return (Phaser.LEFT);
            }
        else if (cursors.right.isDown)
            {
                return (Phaser.RIGHT);
            }
        else if (cursors.up.isDown)
            {
                return (Phaser.UP);
            }
        else if (cursors.down.isDown)
            {
                return (Phaser.DOWN);
            }
    },

    checkForTurn: function (turnDirection) {

        if (willTurn === turnDirection || directions[turnDirection] === null || directions[turnDirection].index !== safetile)
        {
            //  Invalid direction if they're already set to turn that way
            //  Or there is no tile there, or the tile isn't index a floor tile
            return;
        }
        
        if (current === opposites[turnDirection]) //check for turn around
        {
            this.moveSteven(turnDirection);
        }
        else //if turning, set turn direction and turn points
        {
            willTurn = turnDirection;
            turnPoint.x = (marker.x * map.tileWidth) + (map.tileWidth / 2); //check
            turnPoint.y = (marker.y * map.tileHeight) + (map.tileHeight / 2); //check
        }
    },

    turnSteven:function(){
        var sx = Math.floor(steven.x); //get steven's x/y coords
        var sy = Math.floor(steven.y);

        //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
        if (!this.math.fuzzyEqual(sx, turnPoint.x, threshold) || !this.math.fuzzyEqual(sy, turnPoint.y, threshold))
        {
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

    moveSteven: function(direction) {
      
        //console.log("moving " + direction);

        //steven.direction = direction;
        current = direction;

        switch(direction){
            case 4: //down
                steven.body.velocity.x = 0;
                steven.body.velocity.y = gameStats.stevenVelocity;
                break;
            case 3://up
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
        //this.add.tween(steven).to( { angle: this.getAngle(direction) }, this.turnSpeed, "Linear", true);
        current = direction;
        
    },

    updateGridSensors:function(){
        directions[1] = map.getTileLeft(wallLayer.index, marker.x, marker.y);
        directions[2] = map.getTileRight(wallLayer.index, marker.x, marker.y);
        directions[3] = map.getTileAbove(wallLayer.index, marker.x, marker.y);
        directions[4] = map.getTileBelow(wallLayer.index, marker.x, marker.y);

        enemyDirections[1] = map.getTileLeft(wallLayer.index, enemyMark.x+1, enemyMArk.y+1);
        enemyDirections[2] = map.getTileRight(wallLayer.index, enemyMark.x+1, enemyMArk.y+1);
        enemyDirections[3] = map.getTileAbove(wallLayer.index, enemyMark.x+1, enemyMArk.y+1);
        enemyDirections[4] = map.getTileBelow(wallLayer.index, enemyMark.x+1, enemyMArk.y+1);
    },

    collectSnack: function() {
        var gotSnack = false;
        if (snacks) {
            this.game.physics.arcade.overlap(steven, snacks, function() {
                snacks.destroy();
                var currentsnack = gameStats.snacks.find(snacks => snacks.levels.includes(gameStats.level));
                gameStats.score += currentsnack.value;
                snackScore = game.add.text(190, 305, currentsnack.value, { 'fill': 'white', 'fontSize': 25 });
                snackScore.anchor.setTo(0.5);
                snackScore.lifespan = 800;   
                gotSnack = true;
            }); 

            if(gotSnack){
                
                this.game.time.events.add(gameStats.snackRespawnTime, function(){gameStats.snacksAdded = false;}); //wait for timer to respawn snack
                getRandomTile();
                //console.log('snack added is false');
            }    
        }
    },

    updateScore: function() {
        scoreDisplay.setText('Score: ' + gameStats.score);
        //highScoreDisplay.setText('High Score: ' + Math.max(gameStats.score, gameStats.highScore));
        if (gameStats.score >= 10000 && !gameStats.livesEarned) {
            extraLife();
        }
    },

    update: function(){
        if (gameStats.inPlay) {

            this.updateStevenPosition();
            this.updateGridSensors();

            if(cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown){
                this.checkForTurn(this.getMoveKey()); //only move while move keys are pressed
            }

            if (willTurn !== Phaser.NONE) //if a turn direction has been set, turn
             {
                  this.turnSteven();
             }

            this.wrapAround();
            // this.moveEnemies();
            //enemies.forEachExists(function(enemy) {levelState.enemyUpdate(enemy);});
            this.hitWall();
            //console.log(stevenX + ", " + stevenY);
            this.updateScore();
        }
        
        addSnacks();
        this.hitEnemy();
        this.collectSnack();
    },

}
