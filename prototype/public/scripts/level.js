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

    moveSteven: function() {
        this.moveLeft();
        this.moveRight();
        this.moveUp();
        this.moveDown();
        this.wrapAround();
        this.hitWall();
    },

    updateStevenPosition: function() {
        stevenX = Math.round(steven.x / map.tileWidth);
        atevenY = Math.round(steven.y / map.tileHeight);
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
        this.game.physics.arcade.collide(steven, wallLayer, function(sprite, wall) {
            steven.body.velocity.x = 0;
            steven.animations.stop();
        }, null, this);
    },

    pathRightAvailable: function() {
        var index1 = map.getTileRight(0, stevenX, stevenY).index;
        var index2 = map.getTileRight(0, stevenX + 1, stevenY).index;
        var index3 = map.getTileRight(0, stevenX + 2, stevenY).index;
        return [index1, index2, index3].every(index => index == -1);
    },
    
    pathLeftAvailable: function() {
        var index1 = map.getTileLeft(0, stevenX, stevenY).index;
        var index2 = map.getTileLeft(0, stevenX - 1, stevenY).index;
        var index3 = map.getTileLeft(0, stevenX - 2, stevenY).index;
        return [index1, index2, index3].every(index => index == -1);
    },
    
    pathUpAvailable: function() {
        var index1 = map.getTileAbove(0, stevenX, stevenY).index;
        var index2 = map.getTileAbove(0, stevenX, stevenY - 1).index;
        var index3 = map.getTileAbove(0, stevenX, stevenY - 2).index;
        return [index1, index2, index3].every(index => index == -1);
    },
    
    pathDownAvailable: function() {
        var index1 = map.getTileBelow(0, stevenX, stevenY).index
        var index2 = map.getTileBelow(0, stevenX, stevenY + 1).index;
        var index3 = map.getTileBelow(0, stevenX, stevenY + 2).index
        return [index1, index2, index3].every(index => index == -1);
    },

    moveLeft: function() {
        if (cursors.left.justPressed()) {
            steven.direction = 'left';
            steven.body.velocity.y = 0;
            steven.body.velocity.x = -(gameStats.stevenVelocity);
            steven.frame = 4;
            steven.animations.stop();
            steven.animations.play('stevenLeft');
        }
    },
    
    moveRight: function() {
        if (cursors.right.justPressed()) {
            steven.direction = 'right';
            steven.body.velocity.y = 0;
            steven.body.velocity.x = gameStats.stevenVelocity;
            steven.frame = 0;
            steven.animations.stop();
            steven.animations.play('stevenRight');
        }
    },

    moveUp: function() {
        if (cursors.up.justPressed() && this.pathUpAvailable()) {
            steven.direction = 'up';
            steven.body.velocity.x = 0;
            steven.body.velocity.y = -gameStats.stevenVelocity;
            steven.frame = 6;
            steven.animations.stop();
            steven.animations.play('stevenUp');
        }
    },
    
    moveDown: function() {
        if (cursors.down.justPressed() && this.pathDownAvailable()) {
            steven.direction = 'down';
            steven.body.velocity.x = 0;
            steven.body.velocity.y = gameStats.stevenVelocity;
            steven.frame = 2;
            steven.animations.stop();
            steven.animations.play('stevenDown');
        }
    },
    
    update: function(){
        if (gameStats.inPlay) {
            this.moveSteven();
            this.updateStevenPosition();
            //this.moveEnemies();
            //this.updateScore();
        }
        
        //addSnack();
        //this.hitSnack();
        //this.collectSnack();
    },

}