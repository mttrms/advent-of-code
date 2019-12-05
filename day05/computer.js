const fs = require('fs');
const instructions = fs.readFileSync('input.txt', 'utf8')
                   .split(',').map(val => parseInt(val));
let input = 1;

const processOpCode = (opCode) => {
  let newOpCode = String(opCode);

  while (newOpCode.length < 5) {
    newOpCode = "0" + newOpCode;
  }

  return newOpCode;
}

for (let i = 0; i < instructions.length; i++) {
  const instruction = processOpCode(instructions[i]);
  const opCode = instruction.slice(instruction.length - 2);
}

