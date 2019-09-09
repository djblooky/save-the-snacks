//https://phaser.io/examples/v2/input/button-open-popup

var popup;
var backdrop;
var sfxToggle;
var musicToggle;
var tween = null;
var backButton;

function addPauseBackground() {
  
    backdrop = game.add.sprite(game.world.centerX, game.world.centerY, 'backdrop');
    backdrop.anchor.set(0.5);
    backdrop.alpha = 0.6;
    
    popup = game.add.sprite(game.world.centerX, game.world.centerY, 'popup');
    //popup.alpha = 0.8;
    popup.scale.y = 0;
    popup.scale.x = 0;
    popup.anchor.set(0.5);
   
}

function addPauseButtonUI(){ 
    
    //add toggle sfx
    sfxToggle = game.add.button(60, -20, 'onToggle', sfxOff());;
    sfxToggle.scale.x = 0.5;
    sfxToggle.scale.y = 0.5;

    //add toggle music
    musicToggle = game.add.button(60, 80, 'onToggle', musicOff());;
    musicToggle.scale.x = 0.5;
    musicToggle.scale.y = 0.5;

    //add back button
    backButton = game.add.sprite(160, -160, 'exit');
    backButton.inputEnabled = true;
    backButton.input.priorityID = 1;
    backButton.input.useHandCursor = true;
    backButton.events.onInputDown.add(closeWindow, this);

    //  Add the "close button" to the popup window image
    popup.addChild(backButton);
    popup.addChild(sfxToggle);
    popup.addChild(musicToggle);

    //  Hide it awaiting a click
    //popup.scale.set(0.1);

    [backButton, sfxToggle, musicToggle].forEach(s => s.anchor.setTo(0.5));
}

function sfxOff(){

}

function musicOff(){
    //if music is on
    //gameMusic.mute = true;

    //if music is off
   // gameMusic.mute = false;
}

function unpause(){
    //unpause game logic
    backdrop.alpha = 0;
}

function addPauseText(){
    //pauseText = this.game.add.text(0, -115, "The game is paused.", { 'fill': 'white', 'fontSize': 24});
    buildText = this.game.add.text(160, 180, 'Build ' + buildNumber, { 'fill': 'white', 'fontSize': 20 });

    popup.addChild(buildText);
    //popup.addChild(pauseText);
    //sfxText
    //musicText

    [buildText].forEach(s => s.anchor.setTo(0.5));
}
   
function openWindow() {

    if ((tween !== null && tween.isRunning) || popup.scale.x === 0.7)
    {
        return;
    }
    
    //  Create a tween that will pop-open the window, but only if it's not already tweening or open
    tween = game.add.tween(popup.scale).to( { x: 0.7, y: 0.75 }, 1000, Phaser.Easing.Elastic.Out, true);

}

function closeWindow() {
    unpause();

    if (tween && tween.isRunning || popup.scale.x === 0)
    {
        return;
    }

    //  Create a tween that will close the window, but only if it's not already tweening or closed
    tween = game.add.tween(popup.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);

}
