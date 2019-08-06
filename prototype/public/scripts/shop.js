var shopState = {
    
    preload: function(){
        this.game.load.image('shopBackground', 'sky.png'); //shop_bg.png
        this.game.load.image('card', 'shop_card.png');

        //load button ui    
        this.game.load.image('play', 'playbutton.png');//play button
        this.game.load.image('buy', 'buy_button.png');

        //load character/item art
        this.game.load.image('coin', 'coin.png');
        this.game.load.image('icon', 'shop_icon.png');
    },

    addBackground: function() {
        this.game.add.image(0, 0, 'shopBackground');      
    },

    addGraphics: function(){ //add character/item art
        
        coinIcon = this.game.add.image(game.world.centerX - 12, 20, 'coin');
        //shop cards
        card1 = this.game.add.image(game.world.centerX + 40, 100, 'card');
        card2 = this.game.add.image(game.world.centerX + 40, 200, 'card');
        card3 = this.game.add.image(game.world.centerX + 40, 300, 'card');
        card4 = this.game.add.image(game.world.centerX + 40, 400, 'card');
        
        //character icons
        //sword icon
        icon1 = this.game.add.image(game.world.centerX - 100, 100, 'icon');
        icon2 = this.game.add.image(game.world.centerX - 100, 200, 'icon');
        icon3 = this.game.add.image(game.world.centerX - 100, 300, 'icon');
        icon4 = this.game.add.image(game.world.centerX - 100, 400, 'icon');
        
        [coinIcon, card1, card2, card3, card4, icon1, icon2, icon3, icon4].forEach(s => s.anchor.setTo(0.5));
    },

    addText: function(){
        swordCostText = this.game.add.text(game.world.centerX - 20, 100, gameStats.swordCost, { 'fill': 'white', 'fontSize': 16 });
        coinsDisplay = this.game.add.text(game.world.centerX + 12, 22, gameStats.coins, { 'fill': 'white',  'fontSize': 22 }); //coins bottom right
        //swordDesc = this.game.add.text(game.world.centerX + 50, 130, "Sword time +" + gameStats.swordUpgradeValue + " milliseconds!", { 'fill': 'white',  'fontSize': 11 });
       
        [swordCostText].forEach(s => s.anchor.setTo(0.5));
    },
    
    addButtonUI: function(){ 

        upgradeSword = this.game.add.button(game.world.centerX - 20, 100, 'buy', function() {

            var maxedOut = false;
            if(!maxedOut){ //if havent purchased all upgrades
                if(gameStats.coins >= gameStats.swordCost){ //if player can afford upgrade, purchase it
                    
                    gameStats.coins -= gameStats.swordCost;
                    //purchased!
                    //add purchase tally

                    gameStats.swordDuration = gameStats.swordUpgradeValue
                    swordUpgradeValue += 2000 //millis
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
        this.addText();
    }
}