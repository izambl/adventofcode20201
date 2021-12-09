// https://adventofcode.com/2021/day/8
// Seven Segment Search
import { readInput } from '../../common';

const input = readInput('days/day08/input', '\n').map((display) =>
  display.split(' | ').map((digits) =>
    digits.split(' ').map((digit) => {
      return digit.split('').sort().join('');
    })
  )
);

const DIGITS = {
  0: 6, // Length 6 and all from 7 and not 9
  1: 2, // unique
  2: 5,
  3: 5, // All from 6
  4: 4, // unique
  5: 5, // All from 6
  6: 6, // Length 6 after 9 and 0 are found
  7: 3, // unique
  8: 7, // unique
  9: 6, // Length 6 + all chars from 4
};

function part01() {
  let count = 0;

  for (const [, digits] of input) {
    count += digits.reduce((acc, digit) => {
      const len = digit.length;

      if (len === 2 || len === 4 || len === 3 || len === 7) return acc + 1;

      return acc;
    }, 0);
  }

  return count;
}

function part02() {
  let sum = 0;

  for (const [digits, number] of input) {
    const foundDigits = findDigits(digits);
    const foundNumber = number.map((num) => {
      const [, digit] = foundDigits.find(([key]) => key === num);
      return digit;
    });

    sum += Number(foundNumber.join(''));
  }

  return sum;
}

function findDigits(digits: string[]): Array<[string, number]> {
  const digitsMap = new Map();
  const foundDigits: Array<[string, number]> = digits.map((digit): [string, number] => {
    if (digit.length === 2) {
      digitsMap.set(1, digit);
      return [digit, 1];
    }
    if (digit.length === 4) {
      digitsMap.set(4, digit);
      return [digit, 4];
    }
    if (digit.length === 3) {
      digitsMap.set(7, digit);
      return [digit, 7];
    }
    if (digit.length === 7) {
      digitsMap.set(8, digit);
      return [digit, 8];
    }

    return [digit, null];
  });

  const nine = foundDigits.find(([digit]) => {
    const four = digitsMap.get(4);
    const has6digits = digit.length === 6;
    const hasChardFrom1 = digit.includes(four[0]) && digit.includes(four[1]) && digit.includes(four[2]) && digit.includes(four[3]);

    return has6digits && hasChardFrom1;
  });
  nine[1] = 9;
  digitsMap.set(9, nine[0]);

  const zero = foundDigits.find(([digit]) => {
    const seven = digitsMap.get(7);
    const nine = digitsMap.get(9);
    const has6digits = digit.length === 6;
    const notNine = digit !== nine;
    const hasChardFrom7 = digit.includes(seven[0]) && digit.includes(seven[1]) && digit.includes(seven[2]);

    return has6digits && notNine && hasChardFrom7;
  });
  zero[1] = 0;
  digitsMap.set(0, zero[0]);

  const six = foundDigits.find(([digit]) => {
    const zero = digitsMap.get(0);
    const nine = digitsMap.get(9);
    const has6digits = digit.length === 6;
    const notNine = digit !== nine;
    const notZero = digit !== zero;

    return has6digits && notNine && notZero;
  });
  six[1] = 6;
  digitsMap.set(6, six[0]);

  const five = foundDigits.find(([digit]) => {
    const six = digitsMap.get(6);
    const has5digits = digit.length === 5;
    const isInSix =
      six.includes(digit[0]) && six.includes(digit[1]) && six.includes(digit[2]) && six.includes(digit[3]) && six.includes(digit[4]);

    return has5digits && isInSix;
  });
  five[1] = 5;
  digitsMap.set(5, five[0]);

  const three = foundDigits.find(([digit]) => {
    const seven = digitsMap.get(7);
    const has5digits = digit.length === 5;
    const hasAllFrom7 = digit.includes(seven[0]) && digit.includes(seven[1]) && digit.includes(seven[2]);

    return has5digits && hasAllFrom7;
  });
  three[1] = 3;
  digitsMap.set(3, three[0]);

  const two = foundDigits.find(([digit]) => {
    const five = digitsMap.get(5);
    const three = digitsMap.get(3);
    const has5digits = digit.length === 5;
    const not5or3 = digit !== five && digit !== three;

    return has5digits && not5or3;
  });
  two[1] = 2;
  digitsMap.set(2, two[0]);

  return foundDigits;
}

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
