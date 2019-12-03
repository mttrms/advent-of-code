const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split("\n");

const firstWirePath = input[0].split(',');
const secondWirePath = input[1].split(',');

const getCoords = (wire) => {
	let currentPos = [0, 0];
	let count = 0;
	let positions = {};

	wire.forEach((dir) => {
		const direction = dir.slice(0, 1);
		const length = dir.slice(1);

		for (let i = 0; i < length; i++) {
			count += 1;

			if (direction === "L") {
				currentPos = [currentPos[0], currentPos[1] - 1];
			} else if (direction === "U") {
				currentPos = [currentPos[0] - 1, currentPos[1]];
			} else if (direction === "R") {
				currentPos = [currentPos[0], currentPos[1] + 1];
			} else if (direction === "D") {
				currentPos = [currentPos[0] + 1, currentPos[1]];
			}

			let stringPos = `${currentPos[0]},${currentPos[1]}` 
			positions[stringPos] = positions[stringPos] || count;
		}
	})

	return positions;
}

const getIntersections = (pos1, pos2) => {
	let intersections = {};
	let allPoints = Object.keys(pos1).concat(Object.keys(pos2));

	allPoints.forEach((pos) => {
		if (pos1[pos] && pos2[pos]) {
			intersections[pos] = pos1[pos] + pos2[pos];
		}
	})

	return Object.values(intersections);
}

const wireOnePositions = getCoords(firstWirePath);
const wireTwoPositions = getCoords(secondWirePath);

console.log(getIntersections(wireOnePositions, wireTwoPositions));
