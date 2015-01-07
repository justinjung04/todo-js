var gear_big, gear_small_red, gear_small_blue, box_rope, box_top, box_body;

function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height, x, y, this.width, this.height);
}

function initSprites(img) {
	gear_big = new Sprite(img, 137, 87, 140, 140);
	gear_small_red = new Sprite(img, 0, 0, 90, 90);
	gear_small_blue = new Sprite(img, 90, 0, 90, 90);
	box_rope = new Sprite(img, 120, 90, 10, 70);
	box_top = new Sprite(img, 0, 90, 110, 30);
	box_body = new Sprite(img, 0, 120, 110, 110);
}