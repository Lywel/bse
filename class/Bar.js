function Bar() {
	if (Game.bars.length > 0 && Game.bars[Game.bars.length-1]) {
		var g = 0.618033988749895;
		var c = ((Game.bars[Game.bars.length-1].color.split("hsl(").pop().split(",")[0] / 360 + g) % 1) * 360;
	} else {
		var c = Math.random()*360;
	}
	this.color = "hsl("+parseInt(c, 10) + ", 100%, 50%)";

	this.shape = Math.floor(Math.random() * 3);
	this.size = 8/50 * canvas.width;
	this.y = 0;
	this.x = Math.random() * (canvas.width - this.size);

	this.dy = (-100)/(Game.lvl+20)+7;
	this.id = Game.bars.length;
	Game.bars[this.id] = this;
}

Bar.prototype.render = function(ctx) {
	this.y += this.dy;

	if(this.y > canvas.height - 50) {
		delete Game.bars[this.id];
		return;
	}

	ctx.strokeStyle = this.color;

	ctx.beginPath();
	ctx.moveTo(0, this.y);
	
	switch(this.shape){
		case 0:
			ctx.lineTo(this.x, this.y);
			ctx.lineTo(this.x, this.y - this.size/2);
			ctx.lineTo(this.x + this.size, this.y - this.size/2);
			ctx.lineTo(this.x + this.size, this.y);
			break;
		case 1:
			ctx.lineTo(this.x + this.size/4, this.y);
		    ctx.lineTo(this.x + this.size/2, this.y - Math.sqrt(3) * this.size/4);
			ctx.lineTo(this.x + 3/4 * this.size, this.y);
		    break;
		case 2:
			ctx.lineTo(this.x, this.y);
		    ctx.arc(this.x + this.size / 2, this.y, this.size / 2, Math.PI, 0, false); // Cercle exterieur
		    break;
	}
	ctx.lineTo(canvas.width, this.y);
	ctx.lineWidth = canvas.width/50;
	ctx.stroke();

	ctx.strokeStyle = "white";
	ctx.lineWidth = 2;
	ctx.beginPath();
    ctx.arc(this.x + this.size/2 + 8/200 * canvas.width, this.y, 2, 0, Math.PI*2, true);
    ctx.stroke();
	ctx.beginPath();
    ctx.arc(this.x + this.size/2 - 8/200 * canvas.width, this.y, 2, 0, Math.PI*2, true);
    ctx.stroke();
}