var pauseState = {
   
    preload: function(){
        this.game.load.image('pauseBackground', 'sky.png'); //pause_bg.png
        this.game.load.image('backButton', 'back_button.png'); //back_button.png
        //load toggle sfx
        //load toggle music
    },

    addBackground: function() {
        bg = this.game.add.image(0, 0, 'pauseBackground');
        //bg.scale.setTo(0.5,0.5);
    },

    addButtonUI: function(){ 
        //add back button
        back = this.game.add.button(15, 15, 'backButton', function() {
			this.game.state.start('level');
        });
        
        //add toggle sfx
        //add toggle music

        [back].forEach(s => s.anchor.setTo(0.5));
    },

    addText: function(){
        pauseText = this.game.add.text(game.world.centerX, game.world.centerY, "The game is paused. \n(except there's no logic for that yet)", { 'fill': 'white', 'fontSize': 16 });
        buildText = this.game.add.text(40, 540, 'Build 1', { 'fill': 'white', 'fontSize': 14 });

        [pauseText, buildText].forEach(s => s.anchor.setTo(0.5));
    },
    
    create: function(){
        this.addBackground();
        this.addText();
        this.addButtonUI();
    }
}