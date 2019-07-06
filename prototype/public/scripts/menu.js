var menuState = {

    preload: function() {
        this.game.load.image('title', 'steven_logo.png');
        this.game.load.image('play', 'playbutton.png');
        this.game.load.image('shop', 'shopbutton.png');
    },
    
	addBackground: function() {
		this.game.add.image(0, 0, 'menubackground');
	},
	
    create: function() {
		this.addBackground();
		
        var title = this.game.add.image(game.world.centerX, 50, 'title');
        
        //play button
		var play = this.game.add.button(game.world.centerX, 200, 'play', function() {
			this.game.state.start('level');
		});
        
        //shop button
		var shop = this.game.add.button(game.world.centerX, 300, 'shop', function() {
			this.game.state.start('shop');
		});
        
        [title, play, shop].forEach(o => o.anchor.setTo(0.5));
    }
    
}