var GameOver = function(game){};

GameOver.prototype = {

  	create: function(){

			this.background = game.add.tileSprite(0, 0, game.width, game.height, map);
			this.background.autoScroll(-100, 0);

			this.quit = this.game.input.keyboard.addKey(Phaser.KeyCode.ESC);
			this.resume = this.game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
			this.showScore();

	},

	update: function () {
		if (this.resume.isDown) {
			this.restartGame();
		}
		if (this.quit.isDown) {
			this.quitGame();
		}
	},

	showScore: function () {


		this.scoreLabel = this.game.add.bitmapText(this.game.world.centerX
			, this.game.world.centerY / 2, "myfont", "0", 50);
		this.scoreLabel.anchor.setTo(0.5, 0.5);
		this.scoreLabel.align = 'center';
		this.game.world.bringToTop(this.scoreLabel);
		this.scoreLabel.text = "You survived for "+ (score - 2) +" seconds";

		this.highScore = this.game.add.bitmapText(this.game.world.centerX, 
			this.game.world.centerY, "myfont", "0", 60);
		this.highScore.anchor.setTo(0.5, 0.5);
		this.highScore.align = 'center';
		this.game.world.bringToTop(this.highScore);

		this.hs = window.localStorage.getItem('highScore');

		if (this.hs == null) {
			this.highScore.setText("High score: "+score);
			window.localStorage.setItem('highScore', score - 2)
		}
		else if (parseInt(this.hs) < score - 2) {
			this.highScore.setText("High score: " +(score - 2));
			window.localStorage.setItem('highScore', score - 2)
			
		}
		else{
			this.highScore.setText("High score: " + this.hs);			
		}

		this.restart = this.game.add.bitmapText(this.game.world.centerX
			, this.game.world.centerY *1.5 , "myfont"
			, "Press \n Space to retry \n esc to quit", 50);
		this.restart.anchor.setTo(0.5, 0.5);
		this.restart.align = 'center';
		this.game.world.bringToTop(this.restart);
		// this.scoreLabel.bringToTop()

	},

	quitGame: function () {
		this.game.state.start("GameTitle");
	},

	restartGame: function(){
		this.game.state.start("Main");
	}
	
}