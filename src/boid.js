import { WIDTH, HEIGHT } from './index.js';


export default class Boid {
	constructor(id) {
		this.id = id;
		this.coords = this.generateStartCoords(),
		this.vectors = this.generateStartVectors()
		console.log(' ')
		console.log('----------------------')
		console.log('Boid ' + this.id + ' created')
		console.log(this.coords);
		console.log(this.vectors);
		console.log('----------------------')
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

	//apply boundary conditions to boids
	applyBC(){
		let dR = 2;

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

