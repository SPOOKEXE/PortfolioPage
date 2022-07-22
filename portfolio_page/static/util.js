
function getRandomPosition() {
	return createVector(random(0, windowWidth), random(0, windowHeight));
}

function getRandomVelocity() {
	return createVector(random(1, 100) / 100, random(1, 100) / 100);
}

/*
	r = d − 2(d dot n) n
	
	d = direction
	n = normal (unit, normalize)
	r = resultant reflected vector

	(d dot n) is the dot product

	Code: r = d - (2 * d:Dot(n) * n)
*/
function get_reflection_velocity( particleA, particleB ) {
	normal_vector = particleB.pos.copy().sub(particleA.pos).normalize();
	return particleA.vel.reflect(normal_vector);
}

function checkCircularCollision(particleA, particleB) {
	let combinedRadi = (particleA.radius / 2 + particleB.radius / 2);
	let delta_pos = particleA.pos.copy().sub(particleB.pos);
	let dist_apart = delta_pos.mag();
	let IsColliding = (dist_apart <= combinedRadi);
	if (!IsColliding) {
		particleA.collidingWith = null;
		particleB.collidingWith = null;
		return false;
	}

	let directionAToB = particleB.pos.copy().sub(particleA.pos).normalize(); 
	let displace_distance = (combinedRadi - dist_apart) / 2;
	directionAToB.mult(displace_distance);
	particleA.pos.sub(directionAToB);
	particleB.pos.add(directionAToB);

	// Velocity Reflection
	//particleA.vel.mult(-1);
	//particleB.vel.mult(-1);

	particleB.vel.add(particleA.vel.copy().mult(0.8));
	particleA.vel.mult(0.2);

	particleA.collidingWith = particleB;
	particleB.collidingWith = particleA;
	return true;
}

// highlight mouse hovered particles
function highlight_hovered( qtree ) {
	// if mouse is not in the screen, ignore
	if (mouseX > width || mouseY > height) {
		return;
	}

	// get the range around the mouse
	let range = new Rectangle(mouseX, mouseY, 50, 50);
	// query for points
	let points = qtree.query(range);
	
	// display blue region
	stroke(0, 255, 255);
	strokeWeight(1.5);
	noFill();
	rectMode(CENTER);
	rect(range.x, range.y, range.w * 2, range.h * 2);

	// if no points, return
	if (points == null) {
		return;
	}

	// highlight particles
	fill(0, 255, 255);
	for (let particle of points) {
		circle(particle.pos.x, particle.pos.y, particle.radius);
	}
}

// draw an arrow
var arrowXOffset = -1;
var arrowYOffset = -1;
var arrowScale = 1;
// https://stackoverflow.com/questions/620745/c-rotating-a-vector-around-a-certain-point

// function draw_arrow( position, direction ) {
// 	let xPos = position.x;
// 	let yPos = position.y;
	
// 	let centerX = xPos - arrowXOffset;
// 	let centerY = yPos - arrowYOffset;

// 	let vertices = [
// 		[ centerX,		centerY + 1 ],
// 		[ centerX + 3,	centerY + 1 ],
// 		[ centerX + 3,	centerY + 3 ],
// 		[ centerX + 8,	centerY ],
// 		[ centerX + 3,	centerY - 3 ],
// 		[ centerX + 3,	centerY - 1 ],
// 		[ centerX,		centerY - 1 ]
// 	];

// 	// push()
// 	// rotate(Math.cos(50));

// 	stroke(255, 255, 255);
// 	strokeWeight(2);
// 	beginShape(); // start at origin
// 	for (let tupleData of vertices) {
// 		vertex(
// 			tupleData[0] * arrowScale,
// 			tupleData[1] * arrowScale
// 		);
// 	}
// 	endShape(); // back to origin

// 	stroke(255, 0, 0);
// 	strokeWeight(2);
// 	circle(xPos, yPos);

// 	// pop();
// }

function arrow(x,y,x2,y2,length,xs, ys, rotat, style, plan, xshadow, yshadow,txt){
	if (x == undefined) {
	  x = 0;
	}
	  if (y == undefined) {
	  y = 0;
	}
	if (x == undefined) {
	  x2 = 0;
	}
	  if (y == undefined) {
	  y2 = 0;
	}
	if (ys == undefined) {
	  ys = 3;
	} else if (ys == '0') {
	  ys = 0.0001;
	}
	if (xs == undefined) {
	  xs = 5;
	} else if (xs == '0') {
	  xs = 0.0001;
	}
	if (length == undefined) {
	  length = 5;
	}
	  var angle = atan2(y2-y, x2-x);
	if (rotat != undefined) { // write undefined without '' in the call to skip the rotating mode
	  ys = ys*sin(frameCount/10);
	}
	var rxs = constrain(xs,0.0001,9);
	push();
	translate(x,y);
	rotate(angle);
	strokeJoin(ROUND);
	beginShape()
	if (plan == undefined || plan == '2D' || plan == '2d' || plan == '') {
	if (style == 'large') {
	vertex(0,-ys/1.5*length);
	} else if (style == 'pointy') {
	vertex(0,0);
	} else if (style == 'indication') {
	vertex(0,-ys*length);
	} else {
	vertex(0,-ys/3*length);
	}
	if (style == 'indication') {
	vertex(rxs*length, -ys*length);
	} else {
	vertex(rxs*length, -ys/3*length);
	}
	vertex(rxs*length, -ys*length);
	vertex(9*length, 0);
	vertex(rxs*length, ys*length);
	if (style == 'indication') {
	vertex(rxs*length, ys*length);
	} else {
	vertex(rxs*length, ys/3*length);
	}
	if (style == 'large') {
	vertex(0,ys/1.5*length);
	} else if (style == 'pointy') {
	vertex(0,0);
	} else if (style == 'indication') {
	vertex(0,ys*length);
	} else {
	vertex(0,ys/3*length);
	}
	} else if (plan == '3D' || plan == '3d') {
	  var nl = false;
	  if (length < 0) {
	  length = abs(length);
	  rotate(radians(180))
	  nl = true;
	  }
	var shadowx = 0;
	var shadowy = 0;
	if (xshadow != 0 || xshadow != undefined) {
	shadowx = length*xshadow;
	}
	  if (xshadow == 0 || xshadow == undefined) {
	shadowx = 0.0001
	}
	if (yshadow != 0 || yshadow != undefined) {
	shadowy = length*yshadow;
	}
	  if (yshadow == 0 || yshadow == undefined) {
	shadowy = 0.0001
	}
	  if (nl == true) {
	shadowx = -shadowx
	shadowy = -shadowy
	  }
	var yp = 0;
	if (style == 'large') {
	yp = ys/1.5*length;
	} else if (style == 'pointy') {
	yp = 0;
	} else if (style == 'indication') {
	yp = ys*length;
	} else {
	yp = ys/3*length;
	}
	var yq = 0;
	if (style == 'indication') {
	yq = ys*length;
	} else {
	yq = ys/3*length;
	}
	if (rotat != undefined) { // write undefined without '' in the call to skip the rotating mode
	  shadowy = (abs(shadowy)+abs(shadowx))*sin(7.854+frameCount/10);
	  shadowx = 0.01
	  if (ys > 0) {
	vertex(0,-yp);
	vertex(rxs*length, -yq);
	vertex(rxs*length, -ys*length);
	vertex(9*length, 0);
	vertex(rxs*length, ys*length);
	vertex(rxs*length, yq);
	vertex(0,yp);
	  } else {
	vertex(0+shadowx,-yp+shadowy);
	vertex(rxs*length+shadowx, -yq+shadowy);
	vertex(rxs*length+shadowx, -ys*length+shadowy);
	vertex(9*length+shadowx, 0+shadowy);
	vertex(rxs*length+shadowx, ys*length+shadowy);
	vertex(rxs*length+shadowx, yq+shadowy);
	vertex(0+shadowx,yp+shadowy);
	  }
	}
	  translate(-shadowx/2 ,-shadowy/2)
	if (rotat == undefined) {
	if (ys < 0) {
	if (shadowx > 0 && shadowy > 0){
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, ys*length+shadowy,rxs*length, ys*length)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, -ys*length+shadowy,rxs*length, -ys*length)
	} else if (shadowx < 0 && shadowy > 0){
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, -ys*length+shadowy,rxs*length, -ys*length)
	quad(rxs*length+shadowx,-yq+shadowy,rxs*length, -yq,rxs*length, -ys*length,shadowx+rxs*length,-ys*length+shadowy)
	quad(rxs*length+shadowx,yq+shadowy,rxs*length, yq,rxs*length, ys*length,shadowx+rxs*length,ys*length+shadowy)
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(shadowx,-yp+shadowy,0,-yp,0,yp,shadowx,yp+shadowy)
	} else if (shadowx < 0 && shadowy < 0){
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, ys*length+shadowy,rxs*length, ys*length)
	quad(rxs*length+shadowx,-yq+shadowy,rxs*length, -yq,rxs*length, -ys*length,shadowx+rxs*length,-ys*length+shadowy)
	quad(rxs*length+shadowx,yq+shadowy,rxs*length, yq,rxs*length, ys*length,shadowx+rxs*length,ys*length+shadowy)
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(0,yp,rxs*length,yq,shadowx+rxs*length,yq+shadowy,shadowx,yp+shadowy)
	quad(shadowx,-yp+shadowy,0,-yp,0,yp,shadowx,yp+shadowy)
	} else if (shadowx > 0 && shadowy < 0){
	quad(0,yp,rxs*length,yq,shadowx+rxs*length,yq+shadowy,shadowx,yp+shadowy)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, -ys*length+shadowy,rxs*length, -ys*length)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, ys*length+shadowy,rxs*length, ys*length)
	}
	} else if (ys > 0) {
	if (shadowx > 0 && shadowy > 0){
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(0,yp,rxs*length,yq,shadowx+rxs*length,yq+shadowy,shadowx,yp+shadowy)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, -ys*length+shadowy,rxs*length, -ys*length)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, ys*length+shadowy,rxs*length, ys*length)
	} else if (shadowx < 0 && shadowy > 0){
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, ys*length+shadowy,rxs*length, ys*length)
	quad(rxs*length+shadowx,-yq+shadowy,rxs*length, -yq,rxs*length, -ys*length,shadowx+rxs*length,-ys*length+shadowy)
	quad(rxs*length+shadowx,yq+shadowy,rxs*length, yq,rxs*length, ys*length,shadowx+rxs*length,ys*length+shadowy)
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(0,yp,rxs*length,yq,shadowx+rxs*length,yq+shadowy,shadowx,yp+shadowy)
	quad(shadowx,-yp+shadowy,0,-yp,0,yp,shadowx,yp+shadowy)
	} else if (shadowx < 0 && shadowy < 0){
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, -ys*length+shadowy,rxs*length, -ys*length)
	quad(rxs*length+shadowx,-yq+shadowy,rxs*length, -yq,rxs*length, -ys*length,shadowx+rxs*length,-ys*length+shadowy)
	quad(rxs*length+shadowx,yq+shadowy,rxs*length, yq,rxs*length, ys*length,shadowx+rxs*length,ys*length+shadowy)
	quad(0,yp,rxs*length,yq,shadowx+rxs*length,yq+shadowy,shadowx,yp+shadowy)
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(shadowx,-yp+shadowy,0,-yp,0,yp,shadowx,yp+shadowy)
	} else if (shadowx > 0 && shadowy < 0){
	quad(0,yp,rxs*length,yq,shadowx+rxs*length,yq+shadowy,shadowx,yp+shadowy)
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, ys*length+shadowy,rxs*length, ys*length)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, -ys*length+shadowy,rxs*length, -ys*length)
	}
	}
	vertex(0,-yp);
	vertex(rxs*length, -yq);
	vertex(rxs*length, -ys*length);
	vertex(9*length, 0);
	vertex(rxs*length, ys*length);
	vertex(rxs*length, yq);
	vertex(0,yp);
	} else {
	if (shadowx > 0 && shadowy > 0){
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(0,yp,rxs*length,yq,shadowx+rxs*length,yq+shadowy,shadowx,yp+shadowy)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, -ys*length+shadowy,rxs*length, -ys*length)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, ys*length+shadowy,rxs*length, ys*length)
	} else if (shadowx < 0 && shadowy > 0){
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, ys*length+shadowy,rxs*length, ys*length)
	quad(rxs*length+shadowx,-yq+shadowy,rxs*length, -yq,rxs*length, -ys*length,shadowx+rxs*length,-ys*length+shadowy)
	quad(rxs*length+shadowx,yq+shadowy,rxs*length, yq,rxs*length, ys*length,shadowx+rxs*length,ys*length+shadowy)
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(0,yp,rxs*length,yq,shadowx+rxs*length,yq+shadowy,shadowx,yp+shadowy)
	quad(shadowx,-yp+shadowy,0,-yp,0,yp,shadowx,yp+shadowy)
	} else if (shadowx < 0 && shadowy < 0){
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, -ys*length+shadowy,rxs*length, -ys*length)
	quad(rxs*length+shadowx,-yq+shadowy,rxs*length, -yq,rxs*length, -ys*length,shadowx+rxs*length,-ys*length+shadowy)
	quad(rxs*length+shadowx,yq+shadowy,rxs*length, yq,rxs*length, ys*length,shadowx+rxs*length,ys*length+shadowy)
	quad(0,yp,rxs*length,yq,shadowx+rxs*length,yq+shadowy,shadowx,yp+shadowy)
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(shadowx,-yp+shadowy,0,-yp,0,yp,shadowx,yp+shadowy)
	} else if (shadowx > 0 && shadowy < 0){
	quad(0,yp,rxs*length,yq,shadowx+rxs*length,yq+shadowy,shadowx,yp+shadowy)
	quad(0,-yp,rxs*length,-yq,shadowx+rxs*length,-yq+shadowy,shadowx,-yp+shadowy)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, ys*length+shadowy,rxs*length, ys*length)
	quad(9*length,0,9*length+shadowx,0+shadowy,rxs*length+shadowx, -ys*length+shadowy,rxs*length, -ys*length)
	}
	}
	}
	endShape(CLOSE);
	  fill(0)
	  if (plan == undefined || plan == '2D' || plan == '2d' || plan == ''){
	  if (txt != undefined && style != 'pointy') {
	  textAlign(CENTER, CENTER);
		  textSize(constrain(Math.min((abs(length)*100)/textWidth(txt)*0.95,abs(ys*abs(length)/1.5)),0.000001,Infinity))
		  text(txt,4.5*length,0);
	  }
	  if (txt != undefined && style == 'pointy') {
	  textAlign(CENTER, CENTER);
		  textSize(constrain(Math.min(abs(length)*75/textWidth(txt)*(Math.min(abs(9*length)-rxs*abs(length)+0.01,constrain(rxs*abs(length),(6*abs(length))-rxs*abs(length)+0.01,rxs*abs(length)))*0.5/(abs(length)*2))*0.95,abs(ys*abs(length)/1.5)*0.80),0.000001,Infinity))
		  text(txt,4.5*length,0);
	  }
	  } else if (plan == '3D' || plan == '3d') {
	  if (rotat != undefined) {
	  if (ys > 0) {
	  if (nl == true) {
	  translate(4.5*length,0)
	  rotate(radians(180))
	  translate(-4.5*length,-0)
	  }
	  if (txt != undefined && style != 'pointy') {
	  textAlign(CENTER, CENTER);
		  textSize(constrain(Math.min((abs(length)*100)/textWidth(txt)*0.95,abs(ys*abs(length)/1.5)),0.000001,Infinity))
		  text(txt,4.5*length,0);
	  }
	  if (txt != undefined && style == 'pointy') {
	  textAlign(CENTER, CENTER);
		  textSize(constrain(Math.min(abs(length)*75/textWidth(txt)*(Math.min(abs(9*length)-rxs*abs(length)+0.01,constrain(rxs*abs(length),(6*abs(length))-rxs*abs(length)+0.01,rxs*abs(length)))*0.5/(abs(length)*2))*0.95,abs(ys*abs(length)/1.5)*0.80),0.000001,Infinity))
		  text(txt,4.5*length,0);
	  }
	  } else {
	  if (nl == true) {
	  translate(4.5*length,(-yq+shadowy+yq+shadowy)/2)
	  rotate(radians(180))
	  translate(-4.5*length,-(-yq+shadowy+yq+shadowy)/2)
	  }
	  if (txt != undefined && style != 'pointy') {
	  textAlign(CENTER, CENTER);
		  textSize(constrain(Math.min((abs(length)*100)/textWidth(txt)*0.95,abs(ys*abs(length)/1.5)),0.000001,Infinity))
		  text(txt,4.5*length,(-yq+shadowy+yq+shadowy)/2);
	  }
	  if (txt != undefined && style == 'pointy') {
	  textAlign(CENTER, CENTER);
		  textSize(constrain(Math.min(abs(length)*75/textWidth(txt)*(Math.min(abs(9*length)-rxs*abs(length)+0.01,constrain(rxs*abs(length),(6*abs(length))-rxs*abs(length)+0.01,rxs*abs(length)))*0.5/(abs(length)*2))*0.95,abs(ys*abs(length)/1.5)*0.80),0.000001,Infinity))
		  text(txt,4.5*length,(-yq+shadowy+yq+shadowy)/2);
	  }
	  }
	  } else {
	  if (nl == true) {
	  translate(4.5*length,0)
	  rotate(radians(180))
	  translate(-4.5*length,-0)
	  }
	  if (txt != undefined && style != 'pointy') {
	  textAlign(CENTER, CENTER);
		  textSize(constrain(Math.min((abs(length)*100)/textWidth(txt)*0.95,abs(ys*abs(length)/1.5)),0.000001,Infinity))
		  text(txt,4.5*length,0);
	  }
	  if (txt != undefined && style == 'pointy') {
	  textAlign(CENTER, CENTER);
		  textSize(constrain(Math.min(abs(length)*75/textWidth(txt)*(Math.min(abs(9*length)-rxs*abs(length)+0.01,constrain(rxs*abs(length),(6*abs(length))-rxs*abs(length)+0.01,rxs*abs(length)))*0.5/(abs(length)*2))*0.95,abs(ys*abs(length)/1.5)*0.80),0.000001,Infinity))
		  text(txt,4.5*length,0);
	  }
	  }
	  }
	pop();
}
