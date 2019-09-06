//https://phaser.io/examples/v2/input/button-open-popup

var popup;
var sfxToggle;
var musicToggle;
var tween = null;

function addPauseBackground() {
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'popup');
    popup.alpha = 0.8;
    popup.anchor.set(0.5);
    popup.inputEnabled = true;
}

function addPauseButtonUI(){ 
    //add back button
    back = this.game.add.button(15, 15, 'backButton', function() {
        this.game.state.start('level');
    });
    
    //add toggle sfx
    //add toggle music

    [back].forEach(s => s.anchor.setTo(0.5));
}

function addPauseText(){
    pauseText = this.game.add.text(game.world.centerX, game.world.centerY, "The game is paused. \n(except there's no logic for that yet)", { 'fill': 'white', 'fontSize': 16 });
    buildText = this.game.add.text(40, 540, 'Build ' + buildNumber, { 'fill': 'white', 'fontSize': 14 });

    [pauseText, buildText].forEach(s => s.anchor.setTo(0.5));
}
   
