import './style.scss';
import d3 from 'd3';
import math from 'mathjs';
import Boid from './boid.js';

console.log(math.dot);

//setup constants
export const WIDTH = 600;
export const HEIGHT = 400;
export const RADIUS = 10;
const boidCount = 3;
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

//create boids
let boids = [];

for (let i = 0; i < boidCount; i++) {
	let boid = new Boid(i)
	boids.push(boid);
}


// let calculateDistances = function(boids) {
// 	let distances = [];
// 	boids.forEach((currentBoid, i) => {
// 		let boidDistances = [];

// 		boids.forEach((boid) => {

// 			let x1 = currentBoid.coords[0];
// 			let y1 = currentBoid.coords[1];
// 			let x2 = boid.coords[0];
// 			let y2 = boid.coords[1];

// 			let dx = x2 - x1;
// 			let dy = y2 - y1;
// 			let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
// 			if (distance > RADIUS) {
// 				boidDistances.push(false);
// 			} else {
// 				boidDistances.push(true);
// 			}
// 		})
// 		console.log(boidDistances);
// 		distances.push(boidDistances);
// 	})
// 	return distances;
// }



setInterval(() => {

	skySvg.selectAll('*').remove();
	boids.forEach((boid, i) => {

		boid.tick(boids);

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

	// let currentDistances = calculateDistances(boids);
	
}, 10)

