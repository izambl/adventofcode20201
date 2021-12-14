// https://adventofcode.com/2021/day/12
// Passage Pathing
import { first } from 'lodash';
import { readInput } from '../../common';

const [polymer, input] = readInput('days/day14/demoInput', '\n\n');
const polymerTemplates = input.split('\n').reduce((acc, pol) => {
  const [pair, insert] = pol.split(' -> ');

  acc.set(pair, insert);
  return acc;
}, new Map<string, string>());

class Pol {
  name: string;

  prev: Pol;

  next: Pol;

  constructor(name: string) {
    this.name = name;
  }
}

function solve(rounds: number) {
  let firstPolymer: Pol = null;
  let lastPolymer: Pol = null;

  for (const pol of polymer) {
    const newPol = new Pol(pol);

    newPol.prev = lastPolymer;
    if (lastPolymer) lastPolymer.next = newPol;

    lastPolymer = newPol;

    if (!firstPolymer) firstPolymer = newPol;
  }

  while (rounds--) {
    console.log(rounds);
    let currentPol = firstPolymer;

    while (currentPol.next) {
      const nextPol = currentPol.next;

      const newPol = new Pol(polymerTemplates.get(`${currentPol.name}${nextPol.name}`));
      newPol.prev = currentPol;
      newPol.next = nextPol;
      nextPol.prev = newPol;
      currentPol.next = newPol;

      currentPol = nextPol;
    }
  }

  const counts = countMap(firstPolymer);

  let max = -Infinity;
  let min = Infinity;
  for (const pol of Object.keys(counts)) {
    if (counts[pol] > max) max = counts[pol];
    if (counts[pol] < min) min = counts[pol];
  }

  return max - min;
}

function countMap(firstPol: Pol): { [index: string]: number } {
  const counts: { [index: string]: number } = {};
  let pol = firstPol;

  while (pol) {
    counts[pol.name] = counts[pol.name] ? counts[pol.name] + 1 : 1;
    pol = pol.next;
  }

  return counts;
}

function printPol(firstPol: Pol) {
  let pol = firstPol;

  while (pol) {
    process.stdout.write(pol.name);
    pol = pol.next;
  }
  process.stdout.write('\n');
}

process.stdout.write(`Part 01: ${solve(10)}\n`);
process.stdout.write(`Part 02: ${solve(40)}\n`);
