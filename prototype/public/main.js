var game = new Phaser.Game(385, 550, Phaser.AUTO, '');

this.game.state.add('boot', bootState);
this.game.state.add('load', loadState);
this.game.state.add('shop', shopState);
this.game.state.add('level', levelState)
this.game.state.add('pause', pauseState);
this.game.state.add('menu', menuState);
//this.game.state.add('results', resultsState);
//this.game.state.add('settings', settingsState);

this.game.state.start('boot'); //jumps to boot.js