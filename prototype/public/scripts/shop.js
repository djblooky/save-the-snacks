var shopState = {
   
    preload: function(){
        this.game.load.image('shopBackground', 'sky.png'); //shop_bg.png

        //load button ui
        //purchase button
        //to title button
        this.game.load.image('play', 'playbutton.png');//play button

        //load character/item art
    },

    addBackground: function() {
        this.game.add.image(0, 0, 'shopBackground');
        
    },

    addGraphics: function(){ //add character/item art
        
        [].forEach(s => s.anchor.setTo(0.5));
    },
    
    addButtonUI: function(){ 

      //add play button
        play = this.game.add.button(game.world.centerX, 500, 'play', function() {
            menuState.resetGame();
            this.game.state.start('level');
         });
    

        [play].forEach(s => s.anchor.setTo(0.5));
    },
    
    create: function(){
        this.addBackground();
        this.addGraphics();
        this.addButtonUI();
    }
}