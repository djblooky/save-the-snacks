var shopState = {
    
    preload: function(){
        this.game.load.image('shopBackground', 'sky.png'); //shop_bg.png

        //load button ui
        
        //to title button
        this.game.load.image('play', 'playbutton.png');//play button

        this.game.load.image('upgradeSword', 'upgradeSwordButton.png');

        //load character/item art

    },

    addBackground: function() {
        this.game.add.image(0, 0, 'shopBackground');
        
    },

    addGraphics: function(){ //add character/item art
        
        [].forEach(s => s.anchor.setTo(0.5));
    },

    addText: function(){
        swordCostText = this.game.add.text(game.world.centerX, -500, gameStats.swordCost, { 'fill': 'white', 'fontSize': 16 });
       
        [swordCostText].forEach(s => s.anchor.setTo(0.5));
    },
    
    addButtonUI: function(){ 

        upgradeSword = this.game.add.button(game.world.centerX, -500, 'upgradeSword', function() {
                   
            var maxedOut = false;
            if(!maxedOut){ //if havent purchased all upgrades
                if(gameStats.coins >= gameStats.swordCost){ //if player can afford upgrade, purchase it
                    
                    gameStats.coins -= gameStats.swordCost;
                    //purchased!
                    //add purchase tally

                    //gameStats.swordDuration = upgradeValue
                    //upgradeValue += 0.2
                    //upgradeCost += 100
                    
                }
                else{
                    //you can't afford this!
                }
            }   
         });


      //add play button
        play = this.game.add.button(game.world.centerX, 500, 'play', function() {
            menuState.resetGame();
            this.game.state.start('level');
         });
    

        [upgradeSword, play].forEach(s => s.anchor.setTo(0.5));
    },
    
    create: function(){
        this.addBackground();
        this.addGraphics();
        this.addButtonUI();
    }
}