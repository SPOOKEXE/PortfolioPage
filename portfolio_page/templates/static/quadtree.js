
class QuadTree {

	// Declare //
	boundary = null;
	capacity = null;
	points = null;
	divided = null;

	// Constructor //
	constructor(boundary, n) {
		this.boundary = boundary;
		this.capacity = n;
		this.points = [];
		this.divided = false;
	}

	// Methods //
	subdivide() {
		let x = this.boundary.x;
		let y = this.boundary.y;
		let w = this.boundary.w;
		let h = this.boundary.h;
		let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
		this.northeast = new QuadTree(ne, this.capacity);
		let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
		this.northwest = new QuadTree(nw, this.capacity);
		let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
		this.southeast = new QuadTree(se, this.capacity);
		let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
		this.southwest = new QuadTree(sw, this.capacity);
		this.divided = true;
	}

	insert(point) {
		if (!this.boundary.contains(point)) {
			return false;
		}
		if (this.points.length < this.capacity) {
			this.points.push(point);
			return true;
		} else {
			if (!this.divided) {
				this.subdivide();
			}
			if (this.northeast.insert(point)) {
				return true;
			} else if (this.northwest.insert(point)) {
				return true;
			} else if (this.southeast.insert(point)) {
				return true;
			} else if (this.southwest.insert(point)) {
				return true;
			}
		}
	}

	query(range, found) {
		if (!found) {
			found = [];
		}
		if (!this.boundary.intersects(range)) {
			return;
		} else {
			for (let p of this.points) {
				if (range.contains(p)) {
					found.push(p);
				}
			}
			if (this.divided) {
				this.northwest.query(range, found);
				this.northeast.query(range, found);
				this.southwest.query(range, found);
				this.southeast.query(range, found);
			}
		}
		return found;
	}

	show() {
		noFill();
		rectMode(CENTER);
		rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2);
		/*
			strokeWeight(2);
			fill(255, 255, 255);
			for (let point of this.points) {
				point.show();
			}
		*/
		if (this.divided) {
			this.northeast.show();
			this.northwest.show();
			this.southeast.show();
			this.southwest.show();
		}
	}

}
