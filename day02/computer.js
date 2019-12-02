const fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8');
input = input
          .split(',')
          .map(val => parseInt(val));

input[1] = 12;
input[2] = 2;

for (let i = 0; i < input.length; i += 4) {
  const inputOnePos = input[i + 1];
  const inputTwoPos = input[i + 2];
  const outputPos = input[i + 3];
  let output;

  switch (input[i]) {
    case 1:
      output = input[inputOnePos] + input[inputTwoPos];
      input[outputPos] = output;
      break;
    case 2:
      output = input[inputOnePos] * input[inputTwoPos];
      input[outputPos] = output;
      break;
    case 99:
      console.log(input);
      return;
  }
}
