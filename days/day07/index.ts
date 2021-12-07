// https://adventofcode.com/2021/day/7
// The Treachery of Whales
import { readInput } from '../../common';

const positions = readInput('days/day07/input', ',').map(Number);

const uniquePositions = new Set();

for (const position of positions) uniquePositions.add(position);

let minFuel = Infinity;
for (const targetPosition of uniquePositions) {
  let fuel = 0;
  for (const position of positions) {
    fuel += Math.abs(position - Number(targetPosition));
  }
  if (fuel < minFuel) minFuel = fuel;
}

process.stdout.write(`Part 01: ${minFuel}\n`);

let minFuel2 = Infinity;
for (const targetPosition of uniquePositions) {
  let fuel = 0;
  for (const position of positions) {
    fuel += neededFuel(Math.abs(position - Number(targetPosition)));
  }
  if (fuel < minFuel2) minFuel2 = fuel;
}

process.stdout.write(`Part 02: ${minFuel2}\n`);

function neededFuel(pos: number): number {
  let fuel = 0;
  while (pos) {
    fuel += pos;
    pos -= 1;
  }
  return fuel;
}
