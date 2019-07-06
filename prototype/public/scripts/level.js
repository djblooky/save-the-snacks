var levelState = {

    create: function() {
        this.loadGraphics();
        this.loadPhysics();
        this.loadControls();
        loadScoreBoard(); //from game.js

        this.moveSteven(Phaser.DOWN);
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

        marker.x = this.math.snapToFloor(Math.floor(steven.x), map.tileWidth) / map.tileWidth;
        marker.y = this.math.snapToFloor(Math.floor(steven.y), map.tileHeight) / map.tileHeight;
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

    checkForTurn: function (turnDirection) {

        if (willTurn === turnDirection || directions[turnDirection] === null || directions[turnDirection].index !== -1)
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

        console.log("turned " + willTurn)

        willTurn = Phaser.NONE; //resets direction to be turned to to none

        return true;
    },

    moveSteven: function(direction) {
      
        console.log("moving " + direction);

        steven.direction = direction;

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
            this.hitWall();
            console.log(stevenX + ", " + stevenY);
            //this.moveEnemies();
            //this.updateScore();
        }
        
        //addSnack();
        //this.hitSnack();
        //this.collectSnack();
    },

}