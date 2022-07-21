
// Settings //
let PARTICLE_count = 200;
let PARTICLE_protonRadius = 25;
let PARTICLE_electronRadius = 25;
let PARTICLE_attraction_constant = 25; //1 * pow(10, -25);
let PARTICLE_attraction_direction = 1; // 1 = normal, -1 = inverted

let WINDOW_PADDING = 15;

// let QUAD_RegionWidth = 100;

// Variables //
var canvas = null;
var particles = null;

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	bounds = new Rectangle( windowWidth / 2, windowHeight / 2, windowWidth, windowHeight )
	print("Canvas Size ; ", windowWidth, windowHeight)
}

function setup() {
	print("Canvas Size ; ", windowWidth, windowHeight);
	frameRate(60);
	canvas = createCanvas(windowWidth, windowHeight);

	particles = [];
	bounds = new Rectangle( windowWidth / 2, windowHeight / 2, windowWidth, windowHeight );
	
	for (let i = 0; i < PARTICLE_count; i++) {
		let newParticle = new Particle();
		newParticle.pos = getRandomPosition();
		// newParticle.vel = getRandomVelocity().mult(2);
		newParticle.set_random_charge();
		particles[i] = newParticle;
	}
}

function get_velocity_on_vector_field( position ) {
	let x = position.x;
	let y = position.y;
	
	let dirX = 0;
	let dirY = 0;

	/*
	x = windowWidth/25 - x;
	y = windowHeight/25 - y;
	dirX = (x/y) / (y/x);
	dirY = (y/x) / (x/y);
	*/

	/**/
	dirY = (-windowWidth/2) + (x - windowWidth * 0.025);
	dirX = (windowHeight/2) - (y - windowHeight * 0.025);
	

	/*let dist = position.copy().sub( createVector((windowWidth / 2) - 50, (windowHeight / 2) - 50) ).mag();
	if (dist > 250) {
		dirY = -(y - (windowHeight / 2));
		dirX = -(x - (windowWidth / 2));
	} else {
		dirY = (-windowWidth/2) + (x - windowWidth * 0.025);
		dirX = (windowHeight/2) - (y - windowHeight * 0.025);
	}*/

	/*
	dirY = x - windowWidth / 2.5;
	dirX = (y - windowHeight / 2.5);
	*/

	/*
	dirY = x - windowWidth / 2.5;
	dirX = y - windowHeight / 2.5;
	*/
	
	/*
	dirY = x-windowWidth/2;
	dirX = windowHeight-y/2;
	*/

	return createVector(dirX, dirY).normalize(); //.mult(1);
}

function update_particles() {
	
	for (let particle of particles) {
		let net_force = createVector();
		let count = 1;
		let collided_particle = null;
		for (let other of particles) {
			if (particle == other) {
				continue;
			}
			net_force.add( particle.get_attraction_force(other) );
			if (particle.collides(other)) {
				collided_particle = other;
			}
			count = count + 1;
		}

		// avoid dividing by 0
		if (net_force.mag() != 0) {
			net_force.div(count);
		}

		// add net_force to velocity
		particle.vel.add(net_force);
		particle.vel.mult(0.995);

		if (collided_particle != null) {
			let other = collided_particle;
			let combinedRadi = (particle.radius + other.radius) / 2.01;
			let delta_pos = particle.pos.copy().sub(other.pos);
			let dist_apart = delta_pos.mag();
			let directionAToB = other.pos.copy().sub(particle.pos).normalize(); 
			let displace_distance = (combinedRadi - dist_apart) / 2.01;
			directionAToB.mult(displace_distance);
			particle.pos.sub(directionAToB);
			other.pos.add(directionAToB);
			other.vel.add(particle.vel.copy().mult(0.7));
			particle.vel.mult(0.3);
		}

		let vector_field_dir = get_velocity_on_vector_field( particle.pos ).mult(0.005);
		particle.vel.add(vector_field_dir);
	}

}

function draw() {
	background(0);

	// update particles and add to the quadtree
	let qtree = new QuadTree(bounds, 6);
	for (let particle of particles) {
		qtree.insert(particle);
	}

	fill(255,255,255, 30);
	stroke(255, 255, 255, 30);
	let arrow_separation = 40;
	for (let x = 0; x < windowWidth; x += arrow_separation) {
		for (let y = 0; y < windowHeight; y += arrow_separation) {
			let pos = createVector(x, y);
			let direction = get_velocity_on_vector_field(pos);
			let offset_pos = pos.add(direction.mult(5));
			arrow(x, y, offset_pos.x, offset_pos.y, 1);
		}
	}

	update_particles();
	
	// display particles
	fill(255, 255, 255);
	stroke(255, 255, 255);
	strokeWeight(0.05);
	for (let particle of particles) {
		particle.update();
		particle.show();
	}

	// display quadtree
	noFill();
	qtree.show();
	
	// highlight_hovered( qtree );
}
