var bootState = {
	
	create: function() {
		this.game.scale.pageAlignHorizontally = true;
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.state.start('load');
	}
	
}