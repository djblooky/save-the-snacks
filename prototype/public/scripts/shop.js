var shopState = {
   
    preload: function(){
        this.game.load.image('shopBackground', 'sky.png'); //shop_bg.png
        //load button ui
        //purchase button
        //to title button
        //play button

        //load character/item art
    },

    addBackground: function() {
		this.game.add.image(0, 0, 'shopbackground');
    },

    addGraphics: function(){ //add character/item art
        
    },
    
    addButtonUI: function(){ 

    },
    
    create: function(){
        this.addBackground();
        this.addGraphics();
        this.addButtonUI();
    }
}