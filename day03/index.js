const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split("\n");
const firstWirePath = input[0].split(',');
const secondWirePath = input[1].split(',');

let firstWirePos = [0, 0];
let secondWirePos = [0, 0];

let firstWirePositions = {};
let crossedWirePositions = {};

const getFirstWirePositions = (currentPos, pathDirection) => {
  const direction = pathDirection.slice(0, 1);
  const length = parseInt(pathDirection.slice(1));
  const positions = [];

  for (let i = 0; i < length; i++) {
    if (direction === "L") {
      firstWirePos = [firstWirePos[0], firstWirePos[1] - 1];
    } else if (direction === "U") {
      firstWirePos = [firstWirePos[0] - 1, firstWirePos[1]];
    } else if (direction === "R") {
      firstWirePos = [firstWirePos[0], firstWirePos[1] + 1];
    } else if (direction === "D") {
      firstWirePos = [firstWirePos[0] + 1, firstWirePos[1]];
    }
    positions.push(firstWirePos)
  }

  return positions;
}

const getSecondWirePositions = (currentPos, pathDirection) => {
  const direction = pathDirection.slice(0, 1);
  const length = parseInt(pathDirection.slice(1));

  for (let i = 0; i < length; i++) {
    if (direction === "L") {
      secondWirePos = [secondWirePos[0], secondWirePos[1] - 1];
    } else if (direction === "U") {
      secondWirePos = [secondWirePos[0] - 1, secondWirePos[1]];
    } else if (direction === "R") {
      secondWirePos = [secondWirePos[0], secondWirePos[1] + 1];
    } else if (direction === "D") {
      secondWirePos = [secondWirePos[0] + 1, secondWirePos[1]];
    }

    let pos = [JSON.stringify(secondWirePos)];
    if (firstWirePositions[pos] === true) {
      crossedWirePositions[pos] = true;
    }
  }
}

const findClosestCross = (crossedPositions) => {
  for (let pos in crossedPositions) {
    const actualPos = JSON.parse(pos);
    const y = actualPos[0];
    const x = actualPos[1];

    const mValue = (Math.abs(y) + Math.abs(x))


    crossedPositions[pos] = mValue
    // console.log(JSON.parse(pos));
  }
}

firstWirePath.forEach(function(dir) {
  getFirstWirePositions(firstWirePos, dir).forEach((pos) => {
    firstWirePositions[JSON.stringify(pos)] = true;
  })
})

secondWirePath.forEach(function(dir) {
  getSecondWirePositions(secondWirePos, dir);
})

findClosestCross(crossedWirePositions);
console.log(crossedWirePositions);
