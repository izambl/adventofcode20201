// https://adventofcode.com/2021/day/12
// Passage Pathing
import { readInput } from '../../common';

const [polymer, input] = readInput('days/day14/input', '\n\n');
const polymerTemplates = input.split('\n').reduce((acc, pol) => {
  const [pair, insert] = pol.split(' -> ');

  acc.set(pair, insert);
  return acc;
}, new Map<string, string>());

function solve(rounds: number) {
  let finalPolymer = [...polymer];

  while (rounds--) {
    let newPolymer: string[] = [];

    console.log(rounds);

    for (let i = 0; i < finalPolymer.length - 1; i += 1) {
      const pair = finalPolymer.slice(i, i + 2);
      pair.splice(1, 0, polymerTemplates.get(pair.join('')));

      newPolymer.pop();
      newPolymer = [...newPolymer, ...pair];
    }

    finalPolymer = newPolymer;
  }

  const appareancesCount: { [index: string]: number } = {};
  let max = -Infinity;
  let min = Infinity;

  for (const pol of finalPolymer) appareancesCount[pol] = appareancesCount[pol] ? (appareancesCount[pol] += 1) : 1;

  for (const pol of Object.keys(appareancesCount)) {
    if (appareancesCount[pol] > max) max = appareancesCount[pol];
    if (appareancesCount[pol] < min) min = appareancesCount[pol];
  }

  return max - min;
}

process.stdout.write(`Part 01: ${solve(10)}\n`);
process.stdout.write(`Part 02: ${solve(40)}\n`);
