// https://adventofcode.com/2021/day/11
// Dumbo Octopus
import { readInput } from '../../common';

const input = readInput('days/day11/input', '\n').map((line) => line.split('').map(Number));

class Octopus {
  level: number;

  tl: Octopus;

  t: Octopus;

  tr: Octopus;

  r: Octopus;

  br: Octopus;

  b: Octopus;

  bl: Octopus;

  l: Octopus;

  flashes: number;

  constructor(level: number) {
    this.tl = null;
    this.t = null;
    this.tr = null;
    this.r = null;
    this.br = null;
    this.b = null;
    this.bl = null;
    this.l = null;

    this.flashes = 0;
    this.level = level;
  }

  levelUp() {
    this.level += 1;

    if (this.level === 10) this.flash();
  }

  flash() {
    this.flashes += 1;
    this.levelUpNeighbors();
  }

  levelUpNeighbors() {
    this?.tl?.levelUp();
    this?.t?.levelUp();
    this?.tr?.levelUp();
    this?.r?.levelUp();
    this?.br?.levelUp();
    this?.b?.levelUp();
    this?.bl?.levelUp();
    this?.l?.levelUp();
  }

  resetFlash() {
    if (this.level > 9) this.level = 0;
  }
}

function part01() {
  const octopusGrid: Array<Octopus[]> = input.map((row) => row.map((level) => new Octopus(level)));
  const octopuses: Set<Octopus> = new Set();
  let rounds = 100;

  for (let y = 0; y < octopusGrid.length; y += 1) {
    for (let x = 0; x < octopusGrid[y].length; x += 1) {
      const currentOctopus: Octopus = octopusGrid[y][x];

      currentOctopus.tl = octopusGrid[y - 1]?.[x - 1] || null;
      currentOctopus.t = octopusGrid[y - 1]?.[x] || null;
      currentOctopus.tr = octopusGrid[y - 1]?.[x + 1] || null;
      currentOctopus.r = octopusGrid[y]?.[x + 1] || null;
      currentOctopus.br = octopusGrid[y + 1]?.[x + 1] || null;
      currentOctopus.b = octopusGrid[y + 1]?.[x] || null;
      currentOctopus.bl = octopusGrid[y + 1]?.[x - 1] || null;
      currentOctopus.l = octopusGrid[y]?.[x - 1] || null;

      octopuses.add(currentOctopus);
    }
  }

  while (rounds--) {
    for (const octopus of octopuses) octopus.levelUp();
    for (const octopus of octopuses) octopus.resetFlash();
  }

  let flashes = 0;

  for (const octopus of octopuses) flashes += octopus.flashes;

  return flashes;
}

function part02() {
  const octopusGrid: Array<Octopus[]> = input.map((row) => row.map((level) => new Octopus(level)));
  const octopuses: Set<Octopus> = new Set();
  let round = 0;
  let allFlashedRound = false;

  for (let y = 0; y < octopusGrid.length; y += 1) {
    for (let x = 0; x < octopusGrid[y].length; x += 1) {
      const currentOctopus: Octopus = octopusGrid[y][x];

      currentOctopus.tl = octopusGrid[y - 1]?.[x - 1] || null;
      currentOctopus.t = octopusGrid[y - 1]?.[x] || null;
      currentOctopus.tr = octopusGrid[y - 1]?.[x + 1] || null;
      currentOctopus.r = octopusGrid[y]?.[x + 1] || null;
      currentOctopus.br = octopusGrid[y + 1]?.[x + 1] || null;
      currentOctopus.b = octopusGrid[y + 1]?.[x] || null;
      currentOctopus.bl = octopusGrid[y + 1]?.[x - 1] || null;
      currentOctopus.l = octopusGrid[y]?.[x - 1] || null;

      octopuses.add(currentOctopus);
    }
  }

  while (!allFlashedRound) {
    allFlashedRound = true;
    round++;
    for (const octopus of octopuses) octopus.levelUp();
    for (const octopus of octopuses) octopus.resetFlash();

    for (const octopus of octopuses) allFlashedRound = allFlashedRound && octopus.level === 0;
  }

  return round;
}

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
