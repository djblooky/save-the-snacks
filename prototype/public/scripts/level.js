var levelState = {

    createStage: function() {
        map = this.game.add.tilemap('map');
        map.addTilesetImage('tiles', 'tiles');
        map.addTilesetImage('pacman_tiles_2', 'pacmanTiles2');
        this.layer = this.map.createLayer('Tile Layer 2');
        this.map.setCollision(20, true, this.layer);
    },

    createPlayer: function(){

    },


}