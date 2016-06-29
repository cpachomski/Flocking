import './style.scss';
import d3 from 'd3';
import math from 'mathjs';
import Boid from './boid.js';


//setup constants
export const WIDTH = window.innerHeight;
export const HEIGHT = window.innerWidth;
export const RADIUS = 10;
const boidCount = 100;
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

setInterval(() => {

	skySvg.selectAll('*').remove();
	boids.forEach((boid, i) => {


		skySvg
			.append('circle')
			.attr('cx', boid.coords[0])
			.attr('cy', boid.coords[1])
			.attr('r', 1)
			.attr('fill', '#eee');

		skySvg
			.append('circle')
			.attr('cx', boid.coords[0] + (10 * boid.vectors[0]))
			.attr('cy', boid.coords[1] + (10 * boid.vectors[1]))
			.attr('r', 1)
			.attr('fill', 'red');
		boid.tick(boids);
	});
	
}, 50)

