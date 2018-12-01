var canvas = document.getElementById("game_canvas");
canvas.height = window.innerHeight;
canvas.width = 9/16 * canvas.height;
var Game = {
	//Get the context
	ctx: canvas.getContext("2d"),

	audio: new Audio('summertime.min'),

	//Setup keyboard event handler
	isPressed: {
		LEFT: false,
		RIGHT: false,
		TOP: false
	},
	keyDownHandler: function (e) {
		switch(e.keyCode){
			case 39:
				e.preventDefault();
	        	Game.isPressed["RIGHT"] = true;
				break;
			case 37:
				e.preventDefault();
	        	Game.isPressed["LEFT"] = true;
				break;
			case 38:
				e.preventDefault();
	        	Game.isPressed["TOP"] = true;
				break;
			case 40:
				e.preventDefault();
	        	Game.isPressed["BOT"] = true;
				break;
			case 82:
				e.preventDefault();
	        	location.reload();
				break;
		}
	},
	keyUpHandler: function (e) {
		switch(e.keyCode){
			case 39:
				e.preventDefault();
	        	Game.isPressed["RIGHT"] = false;
				break;
			case 37:
				e.preventDefault();
	        	Game.isPressed["LEFT"] = false;
				break;
			case 38:
				e.preventDefault();
	        	Game.isPressed["TOP"] = false;
	        	Game.player.isChanging = false;
	    		clearTimeout(Game.player.timout);
				break;
			case 40:
				e.preventDefault();
	        	Game.isPressed["BOT"] = false;
	        	Game.player.isChanging = false;
	        	clearTimeout(Game.player.timout);
				break;
		}
	},

	//setup the player
	player: new Player(),
	lvl: 0,
	speed: 2,
	particles: [],
	bars: [],

	//Setup the function called 30/s
	update: function () {
		//move the player
		if(Game.isPressed["LEFT"]) {
			if(Game.player.x > 0) {
				Game.player.x -= Game.player.dx;
			}
			else {
				Game.player.x = 0;
			}
		}
		if (Game.isPressed["RIGHT"]) {
			if(Game.player.x < canvas.width - Game.player.size) {
				Game.player.x += Game.player.dx;
			}
			else {
				Game.player.x = canvas.width - Game.player.size;
			}
		}
		if (Game.isPressed["TOP"]) {
			if(!Game.player.isChanging) {
				Game.player.isChanging = true;
				Game.player.timout = setTimeout(function () {
					Game.player.isChanging = false;
				}, 200);
				if(Game.player.shape++ > 1) {
					Game.player.shape = 0;
				}
			}
		}
		if (Game.isPressed["BOT"]) {
			if(!Game.player.isChanging) {
				Game.player.isChanging = true;
				Game.player.timout = setTimeout(function () {
					Game.player.isChanging = false;
				}, 200);
				if(Game.player.shape-- < 1) {
					Game.player.shape = 2;
				}
			}
		}
		//Then we collid !
		Collisions();

		Game.ctx.globalCompositeOperation = "source-over";
		//Clear screen top
		Game.ctx.fillStyle = "rgb(0, 0, 0)";
		Game.ctx.fillRect(0, 0, canvas.width, 4/5 * canvas.height);
		//Clear screen bot
		Game.ctx.fillStyle = "rgba(0, 0, 0, .3)";
		Game.ctx.fillRect(0, canvas.height/2, canvas.width, canvas.height/2);
		showScore();
		Game.ctx.globalCompositeOperation = "lighter";

		//render particles
		for (var i in Game.particles) {
			Game.particles[i].render(Game.ctx);
		}

		Game.ctx.globalCompositeOperation = "source-over";

		//render bars
		for (var i in Game.bars) {
			Game.bars[i].render(Game.ctx);
		}

		//Render player
		Game.player.render(Game.ctx);
	}

};

//Initialize event listener
document.addEventListener("keydown", Game.keyDownHandler, true);
document.addEventListener("keyup", Game.keyUpHandler, true);

Game.audio.play();
//Launch the game !
var GameId = setInterval(Game.update, 1000/60);

var PartGenId = setInterval(function () {
	var dx = (Math.random()*4 - 2)/5;
	var dy = Math.sqrt(Math.pow((-100)/(Game.lvl+20)+7, 2) + dx * dx)
	new Particle(
		Game.player.x + Math.random()*canvas.width/10,
		Game.player.y + Game.player.size,
		dx, dy,
		Game.player.shape,
		"hsla("+ parseInt((90+Game.lvl*8) % 360, 10) + ", 90%, "+ parseInt(Math.abs(50+50/Game.lvl), 10) +"%, .1)"
	);
}, 1000/35);
new Bar();
var BarGenId = setInterval(function () {new Bar()}, 3000);

function lose() {
	Game.ctx.font = parseInt(canvas.height/4, 10)+"px Arial";
	Game.ctx.textAlign = "center";
	Game.ctx.strokeText(("000" + Game.lvl).substr(-3,3),canvas.width/2,canvas.height/2);
	Game.audio.pause();
  saveScore(Game.lvl)
}

function showScore() {
	Game.ctx.font = parseInt(canvas.height/4, 10)+"px Arial";
	Game.ctx.textAlign = "center";
	Game.ctx.fillStyle = "rgba(255,255,255,.1)";
	Game.ctx.fillText(("000" + Game.lvl).substr(-3,3),canvas.width/2,canvas.height/2);
}

function saveScore(score) {
  writeScore(prompt("Save score as:"), score)
}
