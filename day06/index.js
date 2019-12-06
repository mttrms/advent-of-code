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

let planets = buildPlanets(input);
console.log(countOrbits(planets));
