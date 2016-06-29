import { WIDTH, HEIGHT } from './index.js';


export default class Boid {
	constructor(id) {
		this.id = id;
		this.coords = this.generateStartCoords();
		this.vectors = this.generateStartVectors();
		this.maxVelocity = 20;
		this.repulsionVector = [0, 0];
	}

	generateStartCoords() {
		let rand = 1 * (Math.random().toFixed(2));
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

	limitVelocity() {
		let vx = this.vectors[0];
		let vy = this.vectors[1];
		if (Math.abs(vx) > this.maxVelocity) {
			vx = vx / Math.abs(vx) * this.maxVelocity;
		}
		if (Math.abs(vy) > this.maxVelocity) {
			vy = vy / Math.abs(vy) * this.maxVelocity;
		}
		this.vectors[0] = vx;
		this.vectors[1] = vy;
	}

	tick(boids) {
		let cohesionVector = this.cohesion(boids);
		let repulsionVector = this.repulsion(boids);
		let alignmentVector = this.alignment(boids);
		this.vectors[0] += repulsionVector[0] / 10;	
		this.vectors[1] += repulsionVector[1] / 10;
		this.vectors[0] += cohesionVector[0];	
		this.vectors[1] += cohesionVector[1];
		this.vectors[0] += alignmentVector[0];	
		this.vectors[1] += alignmentVector[1];
		this.coords[0] = this.coords[0] + this.vectors[0]/2;
		this.coords[1]  = this.coords[1] + this.vectors[1]/2;
		this.limitVelocity();
		this.applyBC();
	}

	perceivedCOF(boids) {
		let sumX = 0;
		let sumY = 0;
		boids.forEach((boid) => {
			if (boid.coords[0] != this.coords[0]) {
				let dx = this.coords[0] - boid.coords[0];
				let dy = this.coords[1] - boid.coords[1];
				let distance = Math.abs(Math.hypot(dx, dy));
				if (distance < 1000) {
					sumX += boid.coords[0];
					sumY += boid.coords[1];
				} 
			}
		})
		return [(sumX/(boids.length - 1)), (sumY/(boids.length - 1))];
	}

	cohesion(boids) {
		this.cof = this.perceivedCOF(boids);
		let vx = (this.cof[0] - this.coords[0]) / 100;
		let vy = (this.cof[1] - this.coords[1]) / 100;
		return [vx, vy];
	}

	repulsion(boids) {
		boids.forEach((boid) => {
			if (boid.coords[0] != this.coords[0]) {
				let dx = this.coords[0] - boid.coords[0];
				let dy = this.coords[1] - boid.coords[1];
				let distance = Math.abs(Math.hypot(dx, dy));
				if (distance < 1) {
					this.repulsionVector = [(dx - this.repulsionVector[0]), (dy - this.repulsionVector[1])];
				}
			}
		})
		return this.repulsionVector;
	}

	alignment(boids) {
		let vx = 0;
		let vy = 0;
		boids.forEach((boid) => {
			if (boid.coords[0] != this.coords[0]) {
				let dx = this.coords[0] - boid.coords[0];
				let dy = this.coords[1] - boid.coords[1];
				let distance = Math.abs(Math.hypot(dx, dy));
				if (distance < 1000) {
					vx += boid.vectors[0];
					vy += boid.vectors[1];
				}

			}
		})
			return [(vx - this.vectors[0]) / 10000, (vy - this.vectors[1])/10000];
	}

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

