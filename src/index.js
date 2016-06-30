import './style.scss';
import d3 from 'd3';
import math from 'mathjs';
import Boid from './boid.js';

//create skyCanvas
let skySvg = d3.select("#sky")
				.append('svg')
				.attr('width', '100%')
				.attr('height', '100%')
				.attr('id', 'skySvg')

export const RADIUS = 2;
const boidCount = 100;
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
			.attr('cx', boid.coords[0] + (10 * boid.vectors[0]))
			.attr('cy', boid.coords[1] + (10 * boid.vectors[1]))
			.attr('r', RADIUS)
			.attr('fill', '#fff');
		boid.tick(boids);
	});
	
}, 50)

