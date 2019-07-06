var levelState = {

    create: function() {
        this.loadGraphics();
        this.loadPhysics();
        this.loadControls();
        loadScoreBoard(); //from game.js
    },

    loadGraphics: function(){
        this.createStage();
        this.createPlayer();
        this.createEnemies();
        //this.addAnimations();
        //this.animateEnemies();
    },

    loadPhysics : function(){
        this.game.physics.arcade.enable(steven);
        //enable physics for each kind of enemy

        steven.body.velocity.x = gameStats.stevenVelocity;
        steven.body.immovable = true;
        
        //ghosts.setAll('body.immovable', true);
        
        //ghosts.forEachExists(ghost => levelState.mobilizeGhosts(ghost));
        gameStats.inPlay = true;
    },

    loadControls: function(){
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

    },

    updateStevenPosition: function() {
        stevenX = Math.round(steven.x / map.tileWidth);
        stevenY = Math.round(steven.y / map.tileHeight);
    },

    wrapAround: function() {
        if (steven.right >= game.world.right && steven.direction == 'right') {
            steven.right = 0;
        }
        if (steven.left <= 0 && steven.direction == 'left') {
            steven.left = game.world.right;
        }
    },

    hitWall: function() {
      /*  this.game.physics.arcade.collide(steven, wallLayer, function(sprite, wall) {
            steven.body.velocity.x = 0;
            steven.animations.stop();
        }, null, this);*/
        this.game.physics.arcade.collide(steven, wallLayer);
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

    moveSteven: function(direction) {
      /*  this.moveLeft();
        this.moveRight();
        this.moveUp();
        this.moveDown();*/
        console.log("moving " + direction);
        //if that path is open
        steven.direction = direction;

        switch(direction){
            case 4: //down
                steven.body.velocity.x = 0;
                steven.body.velocity.y = gameStats.stevenVelocity;
                steven.body.set
                break;
            case 3://up
                steven.body.velocity.x = 0;
                steven.body.velocity.y = -(gameStats.stevenVelocity);
                break;
            case 1:
                steven.body.velocity.y = 0;
                steven.body.velocity.x = -(gameStats.stevenVelocity);
                break;
            case 2: //right
                steven.body.velocity.y = 0;
                steven.body.velocity.x = gameStats.stevenVelocity;
                break;
        }

        //rotation
        //this.add.tween(this.car).to( { angle: this.getAngle(direction) }, this.turnSpeed, "Linear", true);
        this.wrapAround();
        this.hitWall();
    },

    updateGridSensors:function(){
        directions[1] = map.getTileLeft(wallLayer.index, stevenX, stevenY);
        directions[2] = map.getTileRight(1, stevenX, stevenY);
        directions[3] = map.getTileAbove(1, stevenX, stevenY);
        directions[4] = map.getTileBelow(1, stevenX, stevenY);
    },

    update: function(){
        if (gameStats.inPlay) {

            this.updateGridSensors();
            this.moveSteven(this.getMoveKey());
            this.updateStevenPosition();
            console.log(stevenX + ", " + stevenY);
            //this.moveEnemies();
            //this.updateScore();
        }
        
        //addSnack();
        //this.hitSnack();
        //this.collectSnack();
    },

}