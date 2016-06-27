import './style.scss';
import d3 from 'd3';
import Boid from './boid.js';

console.log(d3);

//setup constants
export const WIDTH = 600;
export const HEIGHT = 400;
const boidCount = 10;
//setup screen
let sky = document.getElementById('sky');
sky.style.width = WIDTH;
sky.style.height = HEIGHT;

//create skyCanvas
let skySvg = d3.select("#sky")
				.append('svg')
				.attr('width', WIDTH)
				.attr('height', HEIGHT)
				.attr('class', 'skySvg')


let calculateDistances = function(boids) {

	boids.forEach((currentBoid) => {
		for (let i = 0; i < boidCount; i++) {
			let x1 = currentBoid.coords[0];
			let y1 = currentBoid.coords[1];
			let x2 = boids[i].coords[0];
			let y2 = boids[i].coords[1];

			let dx = x2 - x1;
			let dy = y2 - y1;
			let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
			if (distance > 0) {
				// console.log('Distance: ' + distance + ' pixels');
			}
		}
	})
}


	let boids = [];

	for (let i = 0; i < boidCount; i++) {
		let boid = new Boid(i)
		boids.push(boid);
	}

	skySvg.selectAll('*').remove();
	boids.forEach((boid, i) => {
		skySvg
			.append('circle')
			.attr('cx', boid.coords[0])
			.attr('cy', boid.coords[1])
			.attr('r', 10)
			.attr('fill', '#eee');

		skySvg
			.append('circle')
			.attr('cx', boid.coords[0] + (10 * boid.vectors[0]))
			.attr('cy', boid.coords[1] + (10 * boid.vectors[1]))
			.attr('r', 3)
			.attr('fill', 'red');
	});

	calculateDistances(boids);
	

