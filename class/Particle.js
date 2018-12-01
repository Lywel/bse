function Particle (x, y, dx, dy, shape, color) {
	this.size = Math.random()*canvas.width/20;

	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.g = Game.speed/15;

	this.shape = shape;
	this.color = color;

	this.id = Game.particles.length;
	Game.particles[this.id] = this;
}

Particle.prototype.render = function(ctx) {
	this.x += this.dx;
	this.y += this.dy;
	this.dy += this.g;
	this.size -= .3;

	if(this.size <= 0) {
		delete Game.particles[this.id];
		return;
	}

	ctx.fillStyle = this.color;
	switch(this.shape){
		case 0:
			ctx.fillRect(this.x, this.y, this.size, this.size);
			break;
		case 1:
			ctx.beginPath();
		    ctx.moveTo(this.x + this.size / 2, this.y);
		    ctx.lineTo(this.x, this.y + Math.sqrt(Math.pow(this.size, 2) - Math.pow(this.size/2, 2)) + 3);
		    ctx.lineTo(this.x + this.size, this.y + Math.sqrt(Math.pow(this.size, 2) - Math.pow(this.size/2, 2)) + 3);
		    ctx.lineTo(this.x + this.size / 2, this.y);
		    ctx.fill();
		    break;
		case 2:
			ctx.beginPath();
		    ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI*2, true); // Cercle exterieur
		    ctx.fill();
		    break;
	}
}

function explode(x, y, shape, color) {
	for (var i = 0; i < Game.lvl*4; i++) {
		new Particle(
			x, y,
			Math.random()*4-2,
			Math.random()*4-3,
			shape, color);
	}
}