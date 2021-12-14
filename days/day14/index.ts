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
  const finalPolymer = [...polymer];
  const polymersTotals: { [index: string]: number } = {};
  let polymerMap = new Map<string, number>();

  for (const pol of finalPolymer) {
    polymersTotals[pol] = (polymersTotals[pol] || 0) + 1;
  }

  for (let i = 0; i < finalPolymer.length - 1; i += 1) {
    const pair = finalPolymer.slice(i, i + 2).join('');
    const total = (polymerMap.get(pair) || 0) + 1;
    polymerMap.set(pair, total);
  }

  while (rounds--) {
    const newPolymerMap = new Map(polymerMap);

    for (const [pol, quantity] of polymerMap) {
      if (quantity === 0) continue;

      const [a, b] = pol.split('');
      const c = polymerTemplates.get(pol);
      polymersTotals[c] = (polymersTotals[c] || 0) + quantity;

      const pair0Total = (newPolymerMap.get(pol) || 0) - quantity;
      newPolymerMap.set(pol, pair0Total);

      const pair1Total = (newPolymerMap.get(`${a}${c}`) || 0) + quantity;
      newPolymerMap.set(`${a}${c}`, pair1Total);

      const pair2Total = (newPolymerMap.get(`${c}${b}`) || 0) + quantity;
      newPolymerMap.set(`${c}${b}`, pair2Total);
    }

    polymerMap = newPolymerMap;
  }

  let max = -Infinity;
  let min = Infinity;
  for (const pol of Object.keys(polymersTotals)) {
    if (polymersTotals[pol] > max) max = polymersTotals[pol];
    if (polymersTotals[pol] < min) min = polymersTotals[pol];
  }

  return max - min;
}

process.stdout.write(`Part 01: ${solve(10)}\n`);
process.stdout.write(`Part 02: ${solve(40)}\n`);
