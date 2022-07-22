
class Rectangle {
	// Declaration //
	x = null;
	y = null;

	w = null;
	h = null;

	// Constructor //
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}

	// Methods //
	contains(particle) {
		return (
			(particle.pos.x - particle.radius) >= (this.x - this.w) &&
			(particle.pos.x + particle.radius) <  (this.x + this.w) &&
			(particle.pos.y - particle.radius) >= (this.y - this.h) &&
			(particle.pos.y + particle.radius) <  (this.y + this.h)
		)
	}

	intersects(range) {
		return !(
			(range.x - range.w) > (this.x + this.w) ||
			(range.x + range.w) < (this.x - this.w) ||
			(range.y - range.h) > (this.y + this.h) ||
			(range.y + range.h) < (this.y - this.h)
		)
	}

	show() {
		rect(this.x, this.y, this.w, this.h);
	}
}
