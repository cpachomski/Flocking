import './style.scss';
import d3 from 'd3';

console.log(d3);

//setup constants
const WIDTH = 600;
const HEIGHT = 400;
const boids = 50;
//setup screen
let sky = document.getElementById('sky');
sky.style.width = WIDTH;
sky.style.height = HEIGHT;


//create starting points
let starts = [];
for (let i = 0; i < boids; i++) {
	let rand = 30 * (Math.random().toFixed(2));
	let startX = (WIDTH/2) + rand;
	let startY = (HEIGHT/2) + rand;
	starts.push([startX, startY]);
}
//create starting velocity vectors
let vectors = [];
for (let i = 0; i < boids; i++) {
	let angle = Math.PI * 2 * (Math.random().toFixed(2));
	let cos = Math.cos(angle);
	let sin = Math.sin(angle);
	vectors.push([cos, sin]);
}
console.log(vectors);

//create skyCanvas
let skySvg = d3.select("#sky")
				.append('svg')
				.attr('width', WIDTH)
				.attr('height', HEIGHT)
				.attr('class', 'skySvg')


//append starting points
starts.forEach((coords) => {
	skySvg
		.append('circle')
		.attr('cx', coords[0])
		.attr('cy', coords[1])
		.attr('r', 1)
		.attr('fill', '#eee')
});