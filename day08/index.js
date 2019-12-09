const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').trim().split('');

const processImage = (input, w, h) => {
  const layers = [];

  for (let i = 0; i < input.length; i++) {
    if (layers[Math.floor(i / (w * h))] === undefined) {
      layers.push([]);
    }
    layers[Math.floor(i / (w * h))].push(Number(input[i]));
  }

  return layers;
}

const zeroCount = (layer) => {
  let count = 0;

  for (let i = 0; i < layer.length; i++) {
    if (layer[i] === 0) {
      count += 1
    }
  }

  return count;
}

const findFewestZeros = (layers) => {
  let layer;
  let smallestZeroCount;

  for (let i = 0; i < layers.length; i++) {
    let zerosInLayer = zeroCount(layers[i]);

    if (smallestZeroCount === undefined || zerosInLayer < smallestZeroCount) {
      layer = layers[i];
      smallestZeroCount = zerosInLayer;
    }
  }

  return layer
}

const finalAnswer = (layer) => {
  let oneCount = 0;
  let twoCount = 0;

  for (let i = 0; i < layer.length; i++) {
    if (layer[i] === 1) {
      oneCount += 1;
    } else if (layer[i] === 2) {
      twoCount += 1;
    }
  }

  return oneCount * twoCount;
}

const layers = processImage(input, 25, 6);
const layer = findFewestZeros(layers);
console.log(finalAnswer(layer));
