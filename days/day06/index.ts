// https://adventofcode.com/2021/day/6
// Lanternfish
import { readInput } from '../../common';

const input = readInput('days/day06/input', ',').map(Number);

const fishes01 = part01(input, 80);
process.stdout.write(`Part 01: ${fishes01}\n`);

const fishes02 = part02(input, 256);
process.stdout.write(`Part 02: ${fishes02}\n`);

function part01(fishes: number[], rounds: number): number {
  let fishCount = [...fishes];
  let days = rounds;

  while (days) {
    const newFishes: number[] = [];
    fishCount = fishCount.map((timer) => {
      if (timer === 0) {
        newFishes.push(8);
        return 6;
      }
      return timer - 1;
    });

    days -= 1;
    fishCount = [...fishCount, ...newFishes];
  }

  return fishCount.length;
}

function part02(fishes: number[], days: number): number {
  const fishCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (const fishLevel of fishes) fishCount[fishLevel] += 1;

  while (days) {
    const newFishes = fishCount.shift();
    fishCount.push(newFishes);
    fishCount[6] += newFishes;

    days -= 1;
  }

  return fishCount.reduce((acc, fish) => acc + fish, 0);
}
