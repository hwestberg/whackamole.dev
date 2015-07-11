(function(){
"use strict"
	var game = {
		mole : $("#mole"),
		highScoreCounter : $("#high-score-counter"),
		pointCounter : $("#point-counter"),
		timerCounter: $("#timer-counter"),
		round : 1,
		points:  0,
		timer: 30,
		isPlaying: false,
		moleImage: ["/tom-bag.png", "/tom-suit.png", 
					"/tom-quizzical.png", "/tom-hawaii.png",
					"/tom-red-suit.png", ],
		highScore: localStorage.getItem("highScore") || 0,
		getHighScore: function(){
			console.log("points are" + game.points);
			console.log("high score is" + game.highScore);
			$("#high-score-counter").html("High Score: " + localStorage.getItem("highScore"));
			if (game.points > game.highScore) {
				game.highScore = parseInt(game.points);
				localStorage.setItem("highScore", game.highScore);
				$("#high-score-counter").html("High Score: " + localStorage.getItem("highScore"));
			}
		},

		gameInit : function(){
			$("#start-button").click(this.startGame);
			game.catchClick();
		},

		startGame: function() {
			game.hideMole();
			game.moleMadness();
			game.updateTimer();
			game.isPlaying = true;
			console.log(game.isPlaying);
		},
		
		selectMolePicture: function (){
			return Math.floor((Math.random()* 4) + 0);
		},

		changeMolePicture: function (){
			console.log("new pic! at index" + game.selectMolePicture());
			$(game.mole).attr("src", game.moleImage[game.selectMolePicture()]);
			console.log("changing picture");
			
		},

		showMoleInterval : function(){
			return Math.floor((Math.random() * 3000) + 1500);
		},
		flashMoleTimeout : function(){
			return Math.floor((Math.random() * 2000) + 1000);
		},
		moveMoleX : function(){
			return Math.floor(Math.random() * (90) + 0);
		},
		moveMoleY : function(){
			return Math.floor(Math.random() * (70) + 0);
			console.log(moveMoleY);
		},			
		hideMole : function(){
				$(game.mole).hide();
				console.log("mole is hidden");
			},
		moveMole : function(){
				$(game.mole).css({
					"left": game.moveMoleX() + "%",
					"top": game.moveMoleY() + "%"	
				})
			},
		showMole : function(){
			setTimeout(function(){-
				$(game.mole).show();
				console.log("mole is visible")
			}, game.flashMoleTimeout())},
		
		moleMadness : function(){
			this.movingMole = setInterval(function(){
			game.moveMole();
			game.showMole();
			game.hideMole();
			game.changeMolePicture();	
			}, game.showMoleInterval());	
		},
		catchClick: function() {
			$(game.mole).click(function(){
				if (game.isPlaying == true){
					game.addPoint();
					game.hideMole();
					console.log("hi");
				}
			});
		},
		updateTimer: function(){
			this.changingTimer = setInterval(function(){
				if (game.timer > 0) {
					game.timer--;
					$(game.timerCounter).html("Timer: 00:" + game.timer + ":00");
					console.log(game.timer);
				} else {
					game.roundReset();
					console.log(game.isPlaying);
					game.getHighScore();
				}
			}, 1000);
		},
		addPoint: function(){	
			game.points++;
			$(game.pointCounter).html("Points: " + game.points)
			console.log("point!");	
		},
		roundReset: function() {
			console.log("end of round one!");	
			clearInterval(this.changingTimer);
			clearInterval(this.movingMole);	
			alert("Final Score: " + game.points);
			game.isPlaying = false;		
			game.points = 0;
			console.log("points reset to " + game.points);
			$(game.pointCounter).html("Points: " + game.points);
			game.timer = 45;
			console.log("timer reset to " + game.timer);
			$(game.timerCounter).html("Timer: 00:" + game.timer + ":00");
		}
	};
	game.gameInit();
	game.getHighScore();

})();