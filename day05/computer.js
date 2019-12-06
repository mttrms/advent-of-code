const fs = require('fs');
const instructions = fs.readFileSync('input.txt', 'utf8')
                   .split(',').map(val => parseInt(val));
let input = 5;
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

  valueOne = paramOne == true ? instructions[i + 1] : instructions[(instructions[i + 1])];
  valueTwo = paramTwo == true ? instructions[i + 2] : instructions[(instructions[i + 2])];

  switch (opCode) {
    case '01':
      instructions[instructions[i + 3]] = valueOne + valueTwo;

      i += 3;
      break;
    case '02':
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
    case '05':
      if (valueOne !== 0) {
        i = Number(valueTwo) - 1;
      } else {
        i += 2;
      }

      break;
    case '06':
      if (valueOne === 0) {
        i = Number(valueTwo) - 1;
      } else {
        i += 2;
      }

      break;
    case '07':
      if (Number(valueOne) < Number(valueTwo)) {
        instructions[instructions[i + 3]] = 1;
      } else {
        instructions[instructions[i + 3]] = 0;
      }

      i += 3;
      break;
    case '08':
      if (Number(valueOne) === Number(valueTwo)) {
        instructions[instructions[i + 3]] = 1;
      } else {
        instructions[instructions[i + 3]] = 0;
      }

      i += 3;
      break;
    case '99':
      console.log(output);
      return;
  }
}

