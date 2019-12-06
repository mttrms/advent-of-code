const fs = require('fs');
const instructions = fs.readFileSync('input.txt', 'utf8')
                   .split(',').map(val => parseInt(val));
let input = 1;
let output; 

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

  const paramOne = instruction[2];
  const paramTwo = instruction[1];
  const paramThree = instruction[0];

  switch (opCode) {
    case '01':
      valueOne = paramOne == true ? instructions[i + 1] : instructions[(instructions[i + 1])];
      valueTwo = paramTwo == true ? instructions[i + 2] : instructions[(instructions[i + 2])];

      instructions[instructions[i + 3]] = valueOne + valueTwo;

      i += 3;
      break;
    case '02':
      valueOne = paramOne == true ? instructions[i + 1] : instructions[(instructions[i + 1])];
      valueTwo = paramTwo == true ? instructions[i + 2] : instructions[(instructions[i + 2])];

      instructions[instructions[i + 3]] = valueOne * valueTwo;

      i += 3;
      break;
    case '03':
      instructions[instructions[i + 1]] = input;

      i += 1;
      break;
    case '04':
      if (paramOne == true) {
        let value = instructions[i + 1];
        output = value;
      } else {
        let position = instructions[i + 1];
        output = instructions[position];
      }

      i += 1;
      break;
    case '99':
      console.log(output);
      return;
  }
}

