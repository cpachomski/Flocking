import { WIDTH, HEIGHT } from './index.js';


export default class Boid {
	constructor(id) {
		this.id = id;
		this.coords = this.generateStartCoords(),
		this.vectors = this.generateStartVectors()
		this.maxVector = 2;
		this.repulsionVector = [0, 0];
	}

	generateStartCoords() {
		let rand = 50 * (Math.random().toFixed(2));
		let startX = (WIDTH/2) + rand;
		let startY = (HEIGHT/2) + rand;
		return [startX, startY];
	}

	generateStartVectors() {
		let angle = Math.PI * 2 * (Math.random().toFixed(2));
		let cos = Math.cos(angle);
		let sin = Math.sin(angle);
		return [cos, sin];
	}

	perceivedCOF(boids) {
		let sumX = 0;
		let sumY = 0;

		boids.forEach((boid) => {
			if (boid.coords[0] != this.coords[0]) {
				sumX += boid.coords[0];
				sumY += boid.coords[1];
			}
		})
		return [(sumX/(boids.length - 1)), (sumY/(boids.length - 1))]
	}

	applyRules(boids) {
	}


	tick(boids) {
		let cohesionVector = this.cohesion(boids);
		let repulsionVector = this.repulsion(boids);

		this.vectors[0] += cohesionVector[0]
		this.vectors[1] += cohesionVector[1]
		this.vectors[0] += repulsionVector[0]
		this.vectors[1] += repulsionVector[1]
		this.coords[0] = this.coords[0] + 10*this.vectors[0];
		this.coords[1] = this.coords[1] + 10*this.vectors[1];

		this.applyBC();
	}

	//COF(Center of Flock) is the average position of the entire flock
	cohesion(boids) {
		this.cof = this.perceivedCOF(boids)
		let dx = (this.cof[0] - this.coords[0]) / 500;
		let dy = (this.cof[1] - this.coords[1]) / 500;
		return [dx, dy];
	}

	repulsion(boids) {
		boids.forEach((boid) => {
			if (boid.coords[0] != this.coords[0]) {
				let dx = this.coords[0] - boid.coords[0];
				let dy = this.coords[1] - boid.coords[1];
				let distance = Math.abs(Math.hypot(dx, dy));
				console.log(distance);
				if (distance < 5) {
					this.repulsionVector = [dx - this.repulsionVector[0],dy - this.repulsionVector[1]];
				}
			}
		})

		return this.repulsionVector
	}

	//apply boundary conditions to boids
	applyBC(){
		let dR = 3;

		if (this.coords[0] > (WIDTH + dR)) {
			this.coords[0] = (dR * -1);
		} else if (this.coords[0] < (dR * -1)) {
			this.coords[0] = WIDTH + dR;
		} else if (this.coords[1] > (HEIGHT + dR)) {
			this.coords[1] = (dR * -1);
		} else if (this.coords[1] < (dR * -1)) {
			this.coords[1] = HEIGHT + dR;
		}
	}

}

