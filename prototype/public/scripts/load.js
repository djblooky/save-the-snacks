var loadState = {
    
    preload: function() { //load game assets
        this.game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.game.load.path = 'assets/';

        this.game.load.image('terrain', 'terrain.png');
        this.game.load.image('menubackground', 'sky.png'); 
        
        this.game.load.image('pause', 'settings_button.png');
        this.game.load.image('exit', 'back_button.png');
        this.game.load.image('swordButton', 'sword_button.png');
        
        //this.game.load.atlasJSONHash('steven', 'steven_move.png', 'steven_move.json');
        this.game.load.spritesheet('steven', 'steven_move.png', stevenSize, stevenSize);
        this.game.load.spritesheet('shrimp', 'shrimp.png', 32,32);
		
        this.game.load.image('life-icon', 'heart.png');
        this.game.load.image('coin', 'coin.png');
        this.game.load.image('scoreText', 'score_text.png');
        
        this.game.load.spritesheet('sword', 'sword.png', 32, 32);

        //snacks
        this.game.load.spritesheet('cookieCat', 'cookie_cat.png',32,32);


        this.game.load.image('chaaps', 'chaaps.png');

    },
    
    create: function() { 
        this.game.state.start('menu'); //jump to game menu
    }
    
}