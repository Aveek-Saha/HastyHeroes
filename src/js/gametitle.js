var GameTitle = function(game){};

var hero = 'hulk';
var exp = 'hulkexp';
var map = 'forest';
var tiles = 'grass';

GameTitle.prototype = {

	create: function(){

		this.spacing = this.game.world.width / 6;

		this.background = game.add.tileSprite(0, 0, game.width, game.height, map);
		this.background.autoScroll(-100, 0);

		this.addChars();
		
		this.i = 0;
		
		// this.cursors = this.game.input.keyboard.createCursorKeys(); 

		SPACEBAR = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		SPACEBAR.onDown.add(this.changeEnv, this);
		console.log(SPACEBAR.onDown);
		
		
		this.title = this.game.add.bitmapText(this.game.world.centerX,
			this.game.world.centerY/3, "myfont", "Hasty Heroes!", 100);
		this.title.anchor.setTo(0.5, 0.5);
		this.title.align = 'center';

		this.character = this.game.add.bitmapText(this.game.world.centerX,
			this.game.world.centerY * 0.65, "myfont", "", 60);
		this.character.anchor.setTo(0.5, 0.5);
		this.character.align = 'center';

		this.select = this.game.add.bitmapText(this.game.world.centerX,
			this.game.world.centerY * 1.7, "myfont", "Press spacebar to\n change Environment", 40);
		this.select.anchor.setTo(0.5, 0.5);
		this.select.align = 'center';
		this.game.world.bringToTop(this.select);

		this.env = this.game.add.bitmapText(this.game.world.centerX,
			this.game.world.centerY * 1.5, "myfont", "< "+map+" >", 70);
		this.env.anchor.setTo(0.5, 0.5);
		this.env.align = 'center';
		this.game.world.bringToTop(this.env);
			

		this.scoreLabel = this.game.add.bitmapText(this.game.world.centerX, 
			this.game.world.centerY* 1.2, "myfont", "click on your hero to begin", 40);
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = 'center';
		this.game.world.bringToTop(this.scoreLabel);


	},
	changeEnv: function(){
		this.i++;

		if (this.i % 3 == 0) {
			map = 'forest';
			tiles = 'grass';

			this.env.text = "< " + map + " >";			
		}

		else if (this.i % 3 == 1) {
			map = 'winter';
			tiles = 'snow';
			this.env.text = "< " + map + " >";			

		}

		else if (this.i % 3 == 2) {
			map = 'desert';
			tiles = 'sand';
			this.env.text = "< " + map + " >";			
			
		}
		console.log(map);
		this.background.destroy();
		this.background = game.add.tileSprite(0, 0, game.width, game.height, map);
		this.background.sendToBack();
		this.background.autoScroll(-100, 0);
		

	},

	update: function(){

		if (this.hulk.input.pointerDown()) {
			hero = 'hulk';
			exp = 'hulkexp';
			this.startGame();
		}
		else if (this.spider.input.pointerDown()) {
			hero = 'spidey';
			exp = 'explode';
			this.startGame();
		}
		else if (this.captain.input.pointerDown()) {
			hero = 'captain';
			exp = 'capexp';
			this.startGame();
		}
		else if (this.dude.input.pointerDown()) {
			hero = 'dude';
			exp = 'noexp';
			this.startGame();
		}
		else if (this.iman.input.pointerDown()) {
			hero = 'iman';
			exp = 'ironexp';
			this.startGame();
		}

		if (this.hulk.input.pointerOver()) {
			this.hulk.scale.setTo(0.5, 0.5);
			this.character.text = "Angry Dude";			
		}
		else if (this.spider.input.pointerOver()) {
			this.spider.scale.setTo(0.5, 0.5);
			this.character.text = "Friendly hood guy";			
			
		}
		else if (this.captain.input.pointerOver()) {
			this.captain.scale.setTo(0.5, 0.5);
			this.character.text = "patriotic guy";			
			
		}
		else if (this.dude.input.pointerOver()) {
			this.dude.scale.setTo(0.5, 0.5);
			this.character.text = "Random dude";			
			
		}
		else if (this.iman.input.pointerOver()) {
			this.iman.scale.setTo(0.5, 0.5);
			this.character.text = "Armored guy";			
			
		}
		else{
			this.hulk.scale.setTo(0.25, 0.25);
			this.iman.scale.setTo(0.25, 0.25);
			this.dude.scale.setTo(0.25, 0.25);
			this.captain.scale.setTo(0.25, 0.25);
			this.spider.scale.setTo(0.25, 0.25);

			this.character.text = "";
			
		}
	},

	addChars: function () {

		var h = this.game.world.centerY ;

		this.hulk = this.game.add.sprite(this.spacing, h, 'hulk');
		this.hulk.scale.setTo(0.25, 0.25);
		this.hulk.anchor.setTo(0.5, 1.0);
		this.hulk.inputEnabled = true;

		this.spider = this.game.add.sprite(2 * this.spacing, h, 'spidey');
		this.spider.scale.setTo(0.25, 0.25);
		this.spider.anchor.setTo(0.5, 1.0);
		this.spider.inputEnabled = true;		

		this.captain = this.game.add.sprite(3 * this.spacing, h, 'captain');
		this.captain.scale.setTo(0.25, 0.25);
		this.captain.anchor.setTo(0.5, 1.0);
		this.captain.inputEnabled = true;		

		this.iman = this.game.add.sprite(4 * this.spacing, h, 'iman');
		this.iman.scale.setTo(0.25, 0.25);
		this.iman.anchor.setTo(0.5, 1.0);
		this.iman.inputEnabled = true;		

		this.dude = this.game.add.sprite(5 * this.spacing, h, 'dude');
		this.dude.scale.setTo(0.25, 0.25);
		this.dude.anchor.setTo(0.5, 1.0);
		this.dude.inputEnabled = true;		
		
	},


	startGame: function(){
		this.game.state.start("Main");
	}

}