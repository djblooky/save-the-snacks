var menuState = {

    preload: function() {
        this.game.load.image('logo', 'steven_logo.png');
        this.game.load.image('title', 'STS_logo.png');
        this.game.load.image('play', 'play_button.png');
        this.game.load.image('play_pressed', 'play_button_pressed.png');
        this.game.load.image('shop', 'shopbutton.png');
    },
    
	addBackground: function() {
        var bg = this.game.add.image(0, 0, 'menubackground');
        //bg.scale.setTo(scaleRatio, scaleRatio);
    },
    
    resetGame:function(){
       setGameStats();
    },
	
    create: function() {
        this.resetGame();
		this.addBackground();
		
        var logo = this.game.add.image(game.world.centerX, 40, 'logo');
        logo.scale.setTo(0.15,0.15);
        var title = this.game.add.image(game.world.centerX, 130, 'title');
        title.scale.setTo(0.5,0.5);
        
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
        [title, logo, play, shop, settings].forEach(o => o.anchor.setTo(0.5));
        
    }
    
}