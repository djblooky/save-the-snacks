var loadState = {
    
    preload: function() { //load game assets
        this.game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.game.load.path = 'assets/';

        this.game.load.image('terrain', 'terrain.png');
        this.game.load.image('menubackground', 'sky.png'); 
        
        this.game.load.image('pause', 'pause_button.png');
        this.game.load.image('exit', 'back_button.png');
        
        this.game.load.spritesheet('steven', 'steven.png', stevenSize, stevenSize);
        this.game.load.spritesheet('shrimp', 'shrimp.png', 30,30);
		
        this.game.load.image('life-icon', 'star.png');
        
        this.game.load.image('sword', 'sword.png');

        //snacks
        this.game.load.image('cookieCat', 'cookie_cat.png')
        this.game.load.image('chaaps', 'chaaps.png')

    },
    
    create: function() { 
        this.game.state.start('menu'); //jump to game menu
    }
    
}