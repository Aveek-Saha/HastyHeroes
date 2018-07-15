var Preload = function(game){};

Preload.prototype = {

	preload: function(){ 

		this.game.load.image('grass', 'assets/grass.png');
		this.game.load.image('sand', 'assets/sand.png');
		this.game.load.image('snow', 'assets/snow2.png');

		this.game.load.image('spidey', 'assets/spiderMan.png');
		this.game.load.image('hulk', 'assets/hulk.png');
		this.game.load.image('iman', 'assets/IronMan.png');
		this.game.load.image('captain', 'assets/captain.png');
		this.game.load.image('dude', 'assets/nomad.png');

		this.game.load.image('spike', 'assets/spikeBall.png');

		this.game.load.image('explode', 'assets/explode.png');
		this.game.load.image('ironexp', 'assets/ironexp.png');
		this.game.load.image('capexp', 'assets/capexp.png');
		this.game.load.image('hulkexp', 'assets/hulkexp.png');
		this.game.load.image('noexp', 'assets/noexp.png');

		this.game.load.image('forest', 'assets/forest.png');
		this.game.load.image('desert', 'assets/desert.png');
		this.game.load.image('winter', 'assets/winter.png');

		this.game.load.bitmapFont('myfont', 'assets/face.png', 'assets/face.fnt');
		
	},

	create: function(){
		this.game.state.start("GameTitle");
	}
}