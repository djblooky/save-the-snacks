var menuState = {

    preload: function() {
        this.game.load.image('title', 'steven_logo.png');
        this.game.load.image('play', 'playbutton.png');
        this.game.load.image('shop', 'shopbutton.png');
    },
    
	addBackground: function() {
        var bg = this.game.add.image(0, 0, 'menubackground');
        //bg.scale.setTo(scaleRatio, scaleRatio);
    },
    
    resetGame:function(){
        gameStats.score = 0;
        gameStats.coins = 0;
    },
	
    create: function() {
        this.resetGame();
		this.addBackground();
		
        var title = this.game.add.image(game.world.centerX, 100, 'title');
        title.scale.setTo(0.3,0.3);
        
        //play button
		var play = this.game.add.button(game.world.centerX, game.world.centerY +200, 'play', function() {
			this.game.state.start('level');
		});
        
        //shop button
		var shop = this.game.add.button(game.world.centerX - 100, game.world.centerY +200, 'shop', function() {
			this.game.state.start('shop');
        });
        
        var settings = this.game.add.button(game.world.centerX + 100, game.world.centerY +200, 'pause', function() {
			this.game.state.start('pause');
		});
        
        //[title, play, shop, settings].forEach(o => o.scale.setTo(scaleRatio, scaleRatio));
        [title, play, shop, settings].forEach(o => o.anchor.setTo(0.5));
        
    }
    
}