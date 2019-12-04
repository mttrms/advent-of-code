const inputOne = 240298;
const inputTwo = 784956;
let validNumCount = 0;

for (let i = inputOne; i <= inputTwo; i++) {
  const digits = Array.from(String(i), Number);
  let hasAdjacent = false;
  let isIncreasing = true;

  for (let d = 0; d < digits.length - 1; d++) {
    if (digits[d] === digits[d+1]) {
      hasAdjacent = true;
    }

    if (digits[d] > digits[d + 1]) {
      isIncreasing = false;
    }
  }

  if (hasAdjacent && isIncreasing) {
    validNumCount += 1;
  }
}

console.log(validNumCount);
