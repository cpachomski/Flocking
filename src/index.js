import './style.scss';
import d3 from 'd3';
import Boid from './boid.js';

console.log(d3);

//setup constants
export const WIDTH = 600;
export const HEIGHT = 400;
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



setInterval(() => {
	//append starting points

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

}, 500)