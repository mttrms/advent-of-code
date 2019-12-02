const fs = require('fs');

for (let n = 0; n <= 99; n++) {
  for (let v = 0; v <= 99; v++) {
    let input = fs.readFileSync('input.txt', 'utf8');
    input = input
      .split(',')
      .map(val => parseInt(val));

    input[1] = n;
    input[2] = v;

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
          if (input[0] === 19690720) {
            console.log(`${n}, ${v}`);
          }
      }
    }
  }
}
