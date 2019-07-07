var pauseState = {
   
    preload: function(){
        this.game.load.image('pauseBackground', 'sky.png'); //pause_bg.png
        //load button ui
    },

    addBackground: function() {
		this.game.add.image(0, 0, 'pausebackground');
    },

    addButtonUI: function(){ 
        //add back button
        //add toggle sfx
        //add toggle music
    },
    
    create: function(){
        this.addBackground();
        this.addButtonUi();
    }
}