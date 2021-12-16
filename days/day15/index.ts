// https://adventofcode.com/2021/day/15
// Chiton
import { readInput } from '../../common';

class Chiton {
  name: string;

  risk: number;

  top: Chiton;

  bottom: Chiton;

  left: Chiton;

  right: Chiton;

  visited: boolean;

  toStart: number;

  parent: Chiton;

  constructor(name: string, risk: number) {
    this.name = name;
    this.risk = risk;
    this.visited = false;
    this.parent = null;
    this.toStart = Infinity;
  }
}

function getChiton(name: string, chitonMap: Map<string, Chiton>, input: Array<number[]>) {
  if (!chitonMap.has(name)) {
    const [y, x] = name.split('/').map(Number);

    if (input[y]?.[x] === undefined) return null;

    chitonMap.set(name, new Chiton(name, input[y][x]));
  }

  return chitonMap.get(name);
}

function inputGraph(input: Array<number[]>): Map<string, Chiton> {
  const chitonMap = new Map<string, Chiton>();

  for (let y = 0; y < input.length; y += 1) {
    for (let x = 0; x < input.length; x += 1) {
      const chiton = getChiton(`${y}/${x}`, chitonMap, input);

      chiton.top = getChiton(`${y - 1}/${x}`, chitonMap, input);
      chiton.bottom = getChiton(`${y + 1}/${x}`, chitonMap, input);
      chiton.right = getChiton(`${y}/${x + 1}`, chitonMap, input);
      chiton.left = getChiton(`${y}/${x - 1}`, chitonMap, input);
    }
  }

  return chitonMap;
}

function normalInput(): Array<number[]> {
  const input: Array<number[]> = readInput('days/day15/demoInput', '\n').map((line) => line.split('').map(Number));

  return input;
}

function extendedInput(mod: number): Array<number[]> {
  const input: Array<number[]> = readInput('days/day15/input', '\n').map((line) => line.split('').map(Number));
  const oLengthY = input.length;
  const oLengthX = input[0].length;
  const yLimit = input.length * mod;
  const xLimit = input[0].length * mod;

  for (let y = 0; y < yLimit; y += 1) {
    for (let x = 0; x < xLimit; x += 1) {
      const xAvail = x - oLengthX >= 0;
      const yAvail = y - oLengthY >= 0;
      const extended = yAvail || xAvail;

      if (extended) {
        const parentRisk = xAvail ? input[y][x - oLengthX] : input[y - oLengthY][x];
        const newRisk = parentRisk + 1 === 10 ? 1 : parentRisk + 1;

        if (!input[y]) input[y] = [];
        input[y][x] = newRisk;
      }
    }
  }

  return input;
}

function Dij(start: Chiton, destination: Chiton, chitonMap: Map<string, Chiton>): Chiton {
  let from = start;
  let nextNeighbor = null;
  const totalNeighbors = chitonMap.size;
  let visitedNeighbors = 0;

  while (from) {
    const neighbors = [from.bottom, from.right, from.top, from.left];

    for (const neighbor of neighbors) {
      if (!neighbor || neighbor.visited) continue;
      const riskToStart = from.toStart + neighbor.risk;

      if (riskToStart < neighbor.toStart) {
        neighbor.toStart = riskToStart;
        neighbor.parent = from;
      }
    }

    from.visited = true;
    visitedNeighbors += 1;
    const percentage = Math.round((visitedNeighbors / totalNeighbors) * 10000) / 100;
    if (visitedNeighbors % 100 === 0) console.log(`Visited: ${percentage}%`);

    if (from === destination) return from;

    nextNeighbor = null;
    for (const chiton of chitonMap.values()) {
      if (!nextNeighbor && !chiton.visited) nextNeighbor = chiton;
      if (!chiton.visited && chiton.toStart < nextNeighbor.toStart) nextNeighbor = chiton;
    }
    from = nextNeighbor;
  }

  return from;
}

function part01() {
  const input = normalInput();
  const chitonMap = inputGraph(input);
  const firstChiton = getChiton('0/0', chitonMap, input);
  const lastChiton = getChiton(`${input.length - 1}/${input[0].length - 1}`, chitonMap, input);

  firstChiton.toStart = 0;
  const allPaths = Dij(firstChiton, lastChiton, chitonMap);

  return allPaths;
}

function part02() {
  const input = extendedInput(5);
  const chitonMap = inputGraph(input);
  const firstChiton = getChiton('0/0', chitonMap, input);
  const lastChiton = getChiton(`${input.length - 1}/${input[0].length - 1}`, chitonMap, input);

  firstChiton.toStart = 0;
  const allPaths = Dij(firstChiton, lastChiton, chitonMap);

  return allPaths;
}

process.stdout.write(`Part 01: ${part01().toStart}\n`);
process.stdout.write(`Part 02: ${part02().toStart}\n`);
