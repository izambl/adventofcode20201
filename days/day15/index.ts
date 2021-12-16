// https://adventofcode.com/2021/day/12
// Passage Pathing
import { readInput } from '../../common';

const input: Array<number[]> = readInput('days/day15/input', '\n').map((line) => line.split('').map(Number));

class Chiton {
  name: string;

  risk: number;

  top: Chiton;

  bottom: Chiton;

  left: Chiton;

  right: Chiton;

  constructor(name: string, risk: number) {
    this.name = name;
    this.risk = risk;
  }
}

const chitonMap = new Map<string, Chiton>();

function getChiton(name: string) {
  if (!chitonMap.has(name)) {
    const [y, x] = name.split('-').map(Number);

    if (input[y]?.[x] === undefined) return null;

    chitonMap.set(name, new Chiton(name, input[y][x]));
  }
  return chitonMap.get(name);
}

function inputGraph() {
  for (let y = 0; y < input.length; y += 1) {
    for (let x = 0; x < input.length; x += 1) {
      const chiton = getChiton(`${y}-${x}`);

      chiton.top = getChiton(`${y - 1}-${x}`);
      chiton.right = getChiton(`${y}-${x + 1}`);
      chiton.bottom = getChiton(`${y + 1}-${x}`);
      chiton.left = getChiton(`${y}-${x - 1}`);
    }
  }
}

function findPaths(
  from: Chiton,
  destination: Chiton,
  currentPath: [number, Chiton[]],
  foundPaths: Array<number[]> = [],
  minPath: number = Infinity
): number {
  if (from === destination) {
    foundPaths.push(currentPath[1].map((chiton) => chiton.risk));

    const pathRisk = currentPath[0];

    console.log('FOUND PATH', pathRisk);

    return pathRisk < minPath ? pathRisk : minPath;
  }

  for (const neighbor of [from.bottom, from.right]) {
    if (!neighbor) continue;
    // if (currentPath[1].includes(neighbor)) continue;

    const nextPath: [number, Chiton[]] = [currentPath[0] + neighbor.risk, [...currentPath[1], neighbor]];

    if (nextPath[0] > minPath) continue;

    // console.log('NEXT PATH', nextPath[1].map((c) => c.risk).join(''));

    minPath = findPaths(neighbor, destination, nextPath, foundPaths, minPath);
  }

  return minPath;
}

function part01() {
  inputGraph();
  const firstChiton = getChiton('0-0');
  const lastChiton = getChiton(`${input.length - 1}-${input[0].length - 1}`);

  const allPaths = findPaths(firstChiton, lastChiton, [0, [firstChiton]]);

  return allPaths - firstChiton.risk;
}

function part02() {}

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
