function Collisions() {
	for(var i in Game.bars) {
		var b = Game.bars[i];

		if (b.y >= Game.player.y + Game.player.size/2) {
			if (b.shape == Game.player.shape &&
			Game.player.x + Game.player.size/2 < b.x + b.size/2 + 8/200 * canvas.width &&
			Game.player.x + Game.player.size/2 > b.x + b.size/2 - 8/200 * canvas.width) {
				delete Game.bars[i];


				if(Game.lvl == 2) {
					clearInterval(BarGenId);
					BarGenId = setInterval(function () {new Bar()}, 2800);
				}
				else if(Game.lvl == 9) {
					clearInterval(BarGenId);
					BarGenId = setInterval(function () {new Bar()}, 1900);
				}
				else if(Game.lvl == 19) {
					clearInterval(BarGenId);
					BarGenId = setInterval(function () {new Bar()}, 1300);
				}
				else if (Game.lvl == 29) {
					clearInterval(BarGenId);
					BarGenId = setInterval(function () {new Bar()}, 1000);
				}
				Game.lvl++;

				explode(b.x + b.size/2, b.y - Game.player.size/2, b.shape, b.color);
				Game.player.color = b.color;
			} else {
				Game.bars[i].color = "red";
				clearInterval(BarGenId);
				clearInterval(PartGenId);
				clearInterval(GameId);
				Game.ctx.fillStyle = "rgb(0, 0, 0)";
				Game.ctx.fillRect(0, 0, canvas.width, canvas.height);
				setTimeout(lose, 10);
			}
		}
		else if (b.y >= Game.player.y) {
			if (!(Game.player.x + Game.player.size/2 < b.x + b.size/2 + 8/200 * canvas.width &&
				Game.player.x + Game.player.size/2 > b.x + b.size/2 - 8/200 * canvas.width)) {
				Game.bars[i].color = "red";
				clearInterval(BarGenId);
				clearInterval(PartGenId);
				clearInterval(GameId);
				Game.ctx.fillStyle = "rgb(0, 0, 0)";
				Game.ctx.fillRect(0, 0, canvas.width, canvas.height);
				setTimeout(lose, 10);
			}
		}
	}
}