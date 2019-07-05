var levelState = {

    create: function() {
        this.loadGraphics();
        //this.loadPhysics();
        //this.loadControls();
        //loadScoreBoard();
    },

    loadGraphics: function(){
        this.createStage();
        this.createPlayer();
        this.createEnemies();
        //this.addAnimations();
        //this.animateGhosts();
    },

    createStage: function() {
        map = this.game.add.tilemap('map');
        map.addTilesetImage('terrain', 'terrain');
        groundLayer = map.createLayer("GroundLayer");
        wallLayer = map.createLayer('WallLayer');
        map.setCollision([297,298,299,329,330,331], true, 'WallLayer');
    },

    createPlayer: function(){
        
    },

    createEnemies: function(){

    },


}