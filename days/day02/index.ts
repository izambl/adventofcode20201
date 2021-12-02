// https://adventofcode.com/2021/day/2
// Dive!

import { readInput } from '../../common';

const input = readInput('days/day02/input').map((instruction: string): [string, number] => {
  const [x, y] = instruction.split(' ');
  return [x, Number(y)];
});

const part01 = {
  depth: 0,
  horizontal: 0,
};

const part02 = {
  depth: 0,
  horizontal: 0,
  aim: 0,
};

// Process part01
for (const [instruction, amount] of input) {
  switch (instruction) {
    case 'down':
      part01.depth += amount;
      break;
    case 'up':
      part01.depth -= amount;
      break;
    case 'forward':
      part01.horizontal += amount;
      break;
  }
}

// Process part02
for (const [instruction, amount] of input) {
  switch (instruction) {
    case 'down':
      part02.aim += amount;
      break;
    case 'up':
      part02.aim -= amount;
      break;
    case 'forward':
      part02.horizontal += amount;
      part02.depth += part02.aim * amount;
      break;
  }
}

process.stdout.write(`Part 01: ${part01.depth * part01.horizontal}\n`);

process.stdout.write(`Part 02: ${part02.depth * part02.horizontal}\n`);
