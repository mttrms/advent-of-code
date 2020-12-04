const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').split("\n");

let validPassports = 0;
let reallyValidPassports = 0;
const passports = [];

const buildPassports = (input) => {
  let passport = {};

  input.forEach((line) => {
    if (line === '') {
      passports.push(Object.assign({}, passport));
      passport = {}
      return;
    }

    passportData = getValues(line);
    passport = {
      ...passport,
      ...passportData
    }
  })
}

const isPassportValid = (passport) => {
  if (!(passport.byr && passport.iyr && passport.eyr && passport.hgt && passport.hcl && passport.ecl && passport.ecl && passport.pid)) {
    return false
  }

  return true;
}

const isPassportReallyValid = (passport) => {
  const validators = [
    byrValidator,
    iyrValidator,
    eyrValidator,
    hgtValidator,
    hclValidator,
    eclValidator,
    pidValidator
  ]

  let isValid = true;
  validators.forEach((validator) => {
    if (!validator(passport)) { isValid = false }
  })
  return isValid
}

const getValues = (line) => {
  const passportData = {};

  line.split(' ').forEach((values) => {
    const [k, v] = values.split(':');
    passportData[k] = v;
  })

  return passportData;
}

const byrValidator = (passport) => {
  const value = passport.byr;
  return Number(value) >= 1920 && Number(value) <= 2002
}

const iyrValidator = (passport) => {
  const value = passport.iyr;
  return Number(value) >= 2010 && Number(value) <= 2020
}

const eyrValidator = (passport) => {
  const value = passport.eyr;
  return Number(value) >= 2020 && Number(value) <= 2030
}


const hgtValidator = (passport) => {
  const value = passport.hgt;
  const unit = value.slice(-2);

  if (unit === 'cm') {
    const num = value.slice(0, -2)
    return Number(num) >= 150 && Number(num) <= 193
  } else if (unit === 'in') {
    const num = value.slice(0, -2)
    return Number(num) >= 59 && Number(num) <= 76
  } else {
    return false;
  }
}

const hclValidator = (passport) => {
  const value = passport.hcl;
  const validChars = '0123456789abcdef'
  const leadingChar = value[0];
  const remainingChars = value.slice(1);

  if (leadingChar != '#') { return false ;}
  for (let i = 0; i < remainingChars.length; i++) {
    if (!validChars.includes(remainingChars[i])) {
      return false;
    }
  }

  return true;
}

const eclValidator = (passport) => {
  const value = passport.ecl;
  const validValues = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

  return validValues.includes(value);
}

const pidValidator = (passport) => {
  const value = passport.pid;
  if (value.length !== 9) { return false }
  for (let i = 0; i < value.length; i++) {
    if (Number.isNaN(Number(value[i]))) { return false; }
  }

  return true;
}

buildPassports(input);

passports.forEach((passport) => {
  if (isPassportValid(passport)) {
    validPassports += 1
  }
})

passports.forEach((passport) => {
  if (isPassportValid(passport) && isPassportReallyValid(passport)) {
    reallyValidPassports += 1
  }
})

console.log('part 1', validPassports)
console.log('part 2', reallyValidPassports)
