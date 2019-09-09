var titleMusic;
var fadeMusic = false;
musicFaded =false;

var menuState = {

    preload: function() {
        this.game.load.image('logo', 'steven_logo.png');
        this.game.load.image('title', 'STS_logo.png');
        this.game.load.image('play', 'play_button.png');
        this.game.load.image('play_pressed', 'play_button_pressed.png');
        this.game.load.image('shop', 'shopbutton.png');
        this.game.load.audio('music', '/audio/title_music.mp3', 0.5, true)

        musicFaded = false;
        fadeMusic = false;
    },
    
	addBackground: function() {
        var bg = this.game.add.image(0, 0, 'menubackground');
        //bg.scale.setTo(scaleRatio, scaleRatio);
    },
  
    fadeMusic: function(){

        
       // titleMusic.fadeTween = 

       

        if(titleMusic.volume > 0 && fadeMusic){
            titleMusic.volume -= 0.1;
        }
        else if(titleMusic.volume <= 0){
            musicFaded = true;
        }
    },

    addButtonUI: function(){
         //play button
		var play = this.game.add.button(game.world.centerX, game.world.centerY +200, 'play', function() {
           // fadeMusic = true;
           //titleMusic.fadeTo(1000, 0);
            //if(musicFaded){
                titleMusic.mute = true;
                this.game.state.start('level');
            //}	
		});
        
        //shop button
		var shop = this.game.add.button(game.world.centerX - 100, game.world.centerY +200, 'shop', function() {
			this.game.state.start('shop');
        });
        
        var settings = this.game.add.button(game.world.centerX + 100, game.world.centerY +200, 'pause', function() {
			pauseGame();
        });
        
        [play, shop, settings].forEach(o => o.anchor.setTo(0.5));
    },

    addTitle: function(){
        var logo = this.game.add.image(game.world.centerX, 40, 'logo');
        logo.scale.setTo(0.15,0.15);
        var title = this.game.add.image(game.world.centerX, 130, 'title');
        title.scale.setTo(0.5,0.5);
        
        [title, logo].forEach(o => o.anchor.setTo(0.5));
    },

    playMusic: function(){
        titleMusic = game.add.audio('music');
        titleMusic.play();
 
    },
 
    resetGame:function(){
       setGameStats();
    },
	
    create: function() {
        this.resetGame();
        this.addBackground();
        this.addButtonUI();
        //add title art
        this.addTitle();
        this.playMusic();
    
    },

    update: function(){
       // this.fadeMusic();
    }
    
}