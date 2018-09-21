var Main = function(game){

};
var score = 0;

Main.prototype = {

	create: function() {

		score = 0;
		this.timing2 = 2000;
		this.timing = 2000;
		this.vel = 140;
		this.spikeVel = (this.game.world.height * 1000) / this.timing2;
		
		this.jumping = false;
		this.createScore();

		this.tileWidth = this.game.cache.getImage(tiles).width;
		this.tileHeight = this.game.cache.getImage(tiles).height;

		this.spikeWidth = this.game.cache.getImage('spike').width;		
		this.spikeHeight = this.game.cache.getImage('spike').height;

		this.game.stage.backgroundColor = '479cde';
		this.background = game.add.tileSprite(0, 0, game.width, game.height, map);
		this.background.autoScroll(-100, 0);

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.platforms = this.game.add.group();
		this.platforms.enableBody = true;
		this.platforms.createMultiple(250, tiles);
		
		this.initialPlatform();

		this.spikes = this.game.add.group();
		this.spikes.enableBody = true;		
		this.spikes.createMultiple(10, 'spike');

		this.emitter = game.add.emitter(0, 0, 20);
		this.emitter.makeParticles(exp);
		this.emitter.gravity = 200;

		

		this.timer = game.time.events.loop(this.timing, this.addPlatform, this);
		this.timer2 = game.time.events.loop(this.timing2, this.addSpike, this);
		this.scoreTimer = game.time.events.loop(1000, this.incrementScore, this);


		this.createPlayer();
		this.cursors = this.game.input.keyboard.createCursorKeys(); 

	},

	update: function() {

		this.game.physics.arcade.collide(this.player, this.platforms);
		this.game.physics.arcade.collide(this.player, this.spikes, this.gameOver, null, this);
		if (this.player.body.position.y >= this.game.world.height - this.player.body.height) {
			this.gameOver();
		}

		if (this.cursors.up.isDown && this.player.body.wasTouching.down) {
			// if (score <= 7) 
			// 	this.player.body.velocity.y = -1250;
			// else
				this.player.body.velocity.y = -1100;
				
		}
		if (this.cursors.left.isDown) {
			this.player.body.velocity.x += -10;
		}
		if (this.cursors.right.isDown) {
			this.player.body.velocity.x += 10;
		}
	},

	particleBurst: function (x, y) {

		this.emitter.x = x;
		this.emitter.y = y;

		this.emitter.start(true, 2000, null, 20);
	},

	gameOver: function(){
		this.particleBurst(this.player.body.position.x + (this.player.body.width / 2), this.player.body.position.y + (this.player.body.height / 2));

		this.player.kill();

		this.game.time.events.add(2000, function () {
			this.game.state.start('GameOver');
		}, this);
	},

	addTile: function( x, y){

		var tile = this.platforms.getFirstDead();

		tile.reset(x,y);
		tile.body.velocity.y = this.vel;
		tile.body.immovable = true;
		tile.checkWorldBounds = true;
		tile.outOfBoundsKill = true;
		// tile.body.friction.x = 1000;
	},

	addPlatform: function (y) {
		
		if (typeof (y) == "undefined") {
			y = -(this.tileHeight);
		}

		// this.vel = (this.timing* this.vel) / this.timing;
		// this.timing -= 100;

		var tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth);

		var hole = Math.floor(Math.random() * (tilesNeeded - (tilesNeeded - 11))) + 1;
		// console.log(hole);
		if (hole == this.prev) {
			if(hole%2 == 0)
				hole += 1;
			else
				hole -=1;
		}
		

		for (var i = 0; i < tilesNeeded - 11; i++) {
			this.addTile((hole + i) * this.tileWidth, y);
		}
		this.prev = hole;
		

	},

	addSpike: function () {

		var spike = this.spikes.getFirstDead();

		if (this.timing2 > 500) {
			this.timing2 -= 5;
			this.spikeVel = (this.game.world.height * 1000) / this.timing2;
		}
		
		var tilesNeeded = Math.ceil(this.game.world.width / this.spikeWidth);

		var x = game.world.randomX;
		var y = -this.spikeHeight

		spike.reset(x, y);

		spike.body.setCircle(50);
		this.game.world.bringToTop(spike);


		spike.body.velocity.y = this.spikeVel;
		spike.body.immovable = true;
		spike.checkWorldBounds = true;
		spike.outOfBoundsKill = true;
		// tile.body.friction.x = 1000;
	},

	addBase: function(){
		var tilesNeeded = Math.ceil(this.game.world.width / this.tileWidth);
		// console.log(this.game.world.width / this.tileWidth);
		
		var y = (-this.tileHeight);

		for (var i = 0; i < tilesNeeded; i++) {
			
				this.addTile(i * this.tileWidth, y);
			
		}
	},

	initialPlatform: function () {


		// for (var y = bottom; y > top - me.tileHeight; y = y - me.spacing) {
			this.addBase();
		// }

	},

	createScore: function () {

		this.scoreLabel = this.game.add.bitmapText(this.game.world.centerX, 100, "myfont", "0", 70);
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = 'center';
		this.game.world.bringToTop(this.scoreLabel);

		this.highScore = this.game.add.bitmapText(this.game.world.centerX * 1.8, 50, "myfont", "0", 40);
		this.highScore.anchor.setTo(0.5, 0.5);
		this.highScore.align = 'right';
		this.game.world.bringToTop(this.highScore);

		if (window.localStorage.getItem('highScore') == null) {
			this.highScore.setText(0);
			this.highScore.setText(window.localStorage.setItem('highScore', 0));
		}
		else{
			this.highScore.setText(window.localStorage.getItem('highScore'));
		}
		// this.scoreLabel.bringToTop()

	},

	incrementScore: function () {
		if (!this.player.alive) return
		score += 1;
		this.scoreLabel.setText(score);
		this.game.world.bringToTop(this.scoreLabel);
		this.highScore.setText("HS: "+window.localStorage.getItem('highScore'));		
		this.game.world.bringToTop(this.highScore);
	},

	createPlayer: function () {


		this.player = this.game.add.sprite(this.game.world.centerX, -this.game.world.height, hero);
		this.player.scale.setTo(0.25, 0.25);
		this.player.anchor.setTo(0.5, 1.0);
		this.game.physics.arcade.enable(this.player);
		this.player.body.gravity.y = 2200;
		this.player.body.collideWorldBounds = true;
		this.player.body.bounce.y = 0.1;
		this.player.body.drag.x = 150;

	}

};