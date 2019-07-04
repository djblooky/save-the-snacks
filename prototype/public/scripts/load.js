var loadState = {
    
    preload: function() { //load game assets
        this.game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.game.load.path = 'assets/';

        this.game.load.image('tiles', 'tiles.png');
        
        this.game.load.spritesheet('dude', 'dude.png',
          { frameWidth: 32, frameHeight: 48 });
		
		this.game.load.image('star', 'star.png');

    },
    
    create: function() { 
        this.game.state.start('menu'); //jump to game menu
    }
    
}