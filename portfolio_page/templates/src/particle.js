
class Particle {
	// Declare //
	id = null;

	particle_type = null;
	charge = null;
	pos = null;
	vel = null;
	
	// Particle Visuals //
	col_r = null;
	col_g = null;
	col_b = null;
	radius = null;
	
	// Debug //
	colliding_with = null;

	// Constructors //
	constructor() {
		this.id = random(1, 1000000);

		this.particle_type = "Neutron";
		this.charge = 0;
		this.pos = createVector();
		this.vel = createVector();
		this.speed = 0;
		
		this.col_r = 0;
		this.col_g = 0;
		this.col_b = 0;
		this.radius = 15;
	}

	// Methods //
	show() {
		noStroke();
		fill(this.col_r, this.col_g, this.col_b);
		circle( this.pos.x, this.pos.y, this.radius );
	}

	set_random_charge() {
		if (Math.round( random(1, 2) ) == 1) {
			this.charge = -1;
			this.col_r = 0;
			this.col_g = 0;
			this.col_b = 255;
			this.radius = this.radius * 0.75;
			this.type = "Electron";
		} else {
			this.charge = 1;
			this.col_r = 255;
			this.col_g = 0;
			this.col_b = 0;
			this.type = "Proton";
		}
	}

	collides(particle) {
		let radi = (particle.radius + this.radius) / 2;
		return this.pos.copy().sub(particle.pos).mag() <= radi;
	}
	
	get_attraction_force(attractant) {
		let closest_distance = this.pos.copy().sub(attractant.pos).mag();
		let attract_strength = (PARTICLE_attraction_constant) / pow(closest_distance, 2);
		let attract_direction = this.pos.copy().sub(attractant.pos).normalize();
		let dir = -1;
		if (this.charge == attractant.charge) {
			dir = 1;
		}
		let combinedRadi = (this.radius * attractant.radius) / 2;
		let magni = attract_strength * combinedRadi * PARTICLE_attraction_direction; 
		return attract_direction.copy().mult(magni).mult(dir);
	}

	update() {
		// add velocity to position
		this.pos.add( this.vel );

		// wrap around the edge
		/* */
		if (this.pos.x < WINDOW_PADDING) {
			this.pos.x = windowWidth - WINDOW_PADDING;
		} else if (this.pos.x >= windowWidth - WINDOW_PADDING) {
			this.pos.x = WINDOW_PADDING;
		}

		if (this.pos.y < WINDOW_PADDING) {
			this.pos.y = windowHeight - WINDOW_PADDING;
		} else if (this.pos.y >= windowHeight - WINDOW_PADDING) {
			this.pos.y = WINDOW_PADDING;
		}
	}
}

