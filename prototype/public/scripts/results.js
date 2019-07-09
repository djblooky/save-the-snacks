var resultsState = {
    preload: function(){
        this.game.load.image('resultsBackground', 'sky.png'); //results_bg.png
        this.game.load.image('shop', 'shopbutton.png'); 
        
    },

    addBackground: function() {
        bg = this.game.add.image(0, 0, 'resultsBackground');
        //bg.scale.setTo(0.5,0.5);
    },

    addButtonUI: function(){ 
        //add shop button
        shop = this.game.add.button(15, 15, 'shop', function() {
			this.game.state.start('shop');
        });
        

        [shop].forEach(s => s.anchor.setTo(0.5));
    },

    addText: function(){
        scoreText = this.game.add.text(game.world.centerX, game.world.centerY, 'Score: ' + gameStats.score, { 'fill': 'white', 'fontSize': 14 });
        highscoreText = this.game.add.text(game.world.centerX, game.world.centerY - 100, 'High score: ' + gameStats.highScore, { 'fill': 'white', 'fontSize': 16 });
        coinsText = this.game.add.text(game.world.centerX, game.world.centerY + 100, 'Coins: ' + gameStats.coins, { 'fill': 'white', 'fontSize': 14 });

        [scoreText, coinsText, highscoreText].forEach(s => s.anchor.setTo(0.5));
    },
    
    create: function(){
        this.addBackground();
        this.addText();
        this.addButtonUI();
    }
}