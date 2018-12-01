function Player () {
	this.size = canvas.width/10;
	this.x = canvas.width/2 - this.size;
	this.dx = canvas.width/75;
	this.y = 4/5 * canvas.height;
	this.shape = 0;
	this.color = "white";
	this.isChanging = false;
}

Player.prototype.render = function(ctx) {
	ctx.strokeStyle = this.color;
	ctx.lineWidth = canvas.width/150;
	switch(this.shape){
		case 0:
			ctx.strokeRect(this.x, this.y, this.size, this.size);
			break;
		case 1:
			ctx.beginPath();
		    ctx.moveTo(this.x + this.size / 2, this.y);
		    ctx.lineTo(this.x, this.y + Math.sqrt(Math.pow(this.size, 2) - Math.pow(this.size/2, 2)) + 3);
		    ctx.lineTo(this.x + this.size, this.y + Math.sqrt(Math.pow(this.size, 2) - Math.pow(this.size/2, 2)) + 3);
		    ctx.lineTo(this.x + this.size / 2, this.y);
		    ctx.stroke();
		    break;
		case 2:
			ctx.beginPath();
		    ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI*2, true); // Cercle exterieur
		    ctx.stroke();
		    break;
	}
	ctx.strokeStyle = "white";
	ctx.beginPath();
    ctx.arc(this.x + this.size/2, this.y, 1, 0, Math.PI*2, true);
    ctx.stroke();
};