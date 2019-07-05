var loadState = {
    
    preload: function() { //load game assets
        this.game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
        
        this.game.load.path = 'assets/';

        this.game.load.image('terrain', 'terrain.png');
        this.game.load.image('menubackground', 'sky.png');
        
        this.game.load.spritesheet('steven', 'car.png',
          { frameWidth: 32, frameHeight: 32 });
		
		this.game.load.image('life-icon', 'star.png');

    },
    
    create: function() { 
        this.game.state.start('menu'); //jump to game menu
    }
    
}