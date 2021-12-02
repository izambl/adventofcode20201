// https://adventofcode.com/2021/day/1
// Sonar Sweep

import { readNumberInput } from '../../common';

const part01 = readNumberInput('days/day01/input01');
const part02 = readNumberInput('days/day01/input02');

function getIncreasing(readings: number[]): number {
  let increasing = 0;

  for (let i = 1; i < readings.length; i += 1) {
    const previous = readings[i - 1];
    const actual = readings[i];

    if (previous === undefined) continue;
    if (previous >= actual) continue;

    increasing += 1;
  }

  return increasing;
}

process.stdout.write(`Part 01: ${getIncreasing(part01)}\n`);

const part2Readings = [];

for (let i = 0; i < part02.length - 2; i += 1) {
  part2Readings.push(part02[i] + part02[i + 1] + part02[i + 2]);
}

process.stdout.write(`Part 02: ${getIncreasing(part2Readings)}\n`);
