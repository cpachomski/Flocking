import { WIDTH, HEIGHT } from './index.js';


export default class Boid {
	constructor(startCoords, startVector) {
		this.coords = startCoords,
		this.vectors = startVectors

		console.log(this);
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