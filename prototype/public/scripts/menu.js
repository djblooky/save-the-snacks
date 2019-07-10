var menuState = {

    preload: function() {
        this.game.load.image('title', 'steven_logo.png');
        this.game.load.image('play', 'playbutton.png');
        this.game.load.image('shop', 'shopbutton.png');
    },
    
	addBackground: function() {
		this.game.add.image(0, 0, 'menubackground');
    },
    
    resetGame:function(){
        gameStats.score = 0;
        gameStats.coins = 0;

    },
	
    create: function() {
        this.resetGame();
		this.addBackground();
		
        var title = this.game.add.image(game.world.centerX, 50, 'title');
        
        //play button
		var play = this.game.add.button(game.world.centerX - 30, game.world.centerY +200, 'play', function() {
			this.game.state.start('level');
		});
        
        //shop button
		var shop = this.game.add.button(game.world.centerX + 50, game.world.centerY +200, 'shop', function() {
			this.game.state.start('shop');
		});
        
        [title, play, shop].forEach(o => o.anchor.setTo(0.5));
    }
    
}