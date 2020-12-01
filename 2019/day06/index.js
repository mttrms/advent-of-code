const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8')
              .trim().split('\n');

class Planet {
  constructor(name, parent = null) {
    this.name = name;
    this.parent = parent;
    this.children = [];
  }
}

const buildPlanets = (input) => {
  const planets = {};

  input.forEach((orbitData) => {
    orbitData = orbitData.split(')');
    const parentPlanetName = String(orbitData[0]);
    const childPlanetName = String(orbitData[1]);

    planets[parentPlanetName] = planets[parentPlanetName] || new Planet(parentPlanetName);
    planets[childPlanetName] = planets[childPlanetName] || new Planet(childPlanetName);

    const parentPlanet = planets[parentPlanetName];
    const childPlanet = planets[childPlanetName];

    childPlanet.parent = parentPlanet;
    parentPlanet.children.push(childPlanet);
  })

  return planets;
}

const countOrbits = (planets) => {
  let orbitCount = 0;

  Object.values(planets).forEach((planet) => {
    let parentPlanet = planet.parent;

    while (parentPlanet !== null) {
      orbitCount += 1;
      parentPlanet = parentPlanet.parent;
    }
  })

  return orbitCount;
}

const calculateTransfers = (planets, origin, destination) => {
  const originPlanet = planets[origin];
  const destinationPlanet = planets[destination];

  const originOrbits = buildOrbits(originPlanet);
  const destinationOrbits = buildOrbits(destinationPlanet);

  let requiredHops = 0;

  for (let i = 0; i < destinationOrbits.length; i++) {
    if (originOrbits.find((planet, idx) => {
      requiredHops = idx;
      return destinationOrbits[i].name === planet.name;
    })) {
      return requiredHops + i;
    }
  }
}

const buildOrbits = (planet) => {
  const orbits = [];
  let parentPlanet = planet.parent;

  while (parentPlanet !== null) {
    orbits.push(parentPlanet);
    parentPlanet = parentPlanet.parent;
  }

  return orbits;
}

let planets = buildPlanets(input);
let orig = 'YOU';
let dest = 'SAN';

console.log(countOrbits(planets));
console.log(calculateTransfers(planets, orig, dest));
