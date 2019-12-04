const inputOne = 240298;
const inputTwo = 784956;
let validNumCount = 0;

for (let i = inputOne; i <= inputTwo; i++) {
  const digits = Array.from(String(i), Number);
  let isIncreasing = true;
  let adjacentDigits = {};

  for (let d = 0; d < digits.length - 1; d++) {
    let digit = digits[d];
    if (digits[d] === digits[d+1]) {
      adjacentDigits[digit] = adjacentDigits[digit] + 1 || 1;
    }

    if (digits[d] > digits[d + 1]) {
      isIncreasing = false;
    }
  }

  if (isIncreasing && Object.values(adjacentDigits).some((count) => {
    return count === 1;
  })) {
    validNumCount += 1;
  }
}

console.log(validNumCount);
