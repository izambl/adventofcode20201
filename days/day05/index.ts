// https://adventofcode.com/2021/day/5
// Hydrothermal Venture
import { readInput } from '../../common';

interface Map {
  [index: string]: number;
}
type Point = [number, number];

const input = readInput('days/day05/input', '\n').map((line) => line.split(' -> ').map((coords) => coords.split(',').map(Number)));
const map01: Map = {};
const map02: Map = {};

// Part 01
for (const [[x1, y1], [x2, y2]] of input) {
  if (x1 !== x2 && y1 !== y2) continue;
  goFrom([x1, y1], [x2, y2], map01);
}
process.stdout.write(`Part 01: ${numberOfIntersections(map01)}\n`);

// Part 02
for (const [[x1, y1], [x2, y2]] of input) {
  goFrom([x1, y1], [x2, y2], map02);
}
process.stdout.write(`Part 01: ${numberOfIntersections(map02)}\n`);

function goFrom(point1: Point, point2: Point, map: Map) {
  map[point1.join()] = (map[point1.join()] || 0) + 1;

  while (point1.join() !== point2.join()) {
    if (point1[0] < point2[0]) point1[0] += 1;
    if (point1[1] < point2[1]) point1[1] += 1;
    if (point1[0] > point2[0]) point1[0] -= 1;
    if (point1[1] > point2[1]) point1[1] -= 1;
    map[point1.join()] = (map[point1.join()] || 0) + 1;
  }
}

function numberOfIntersections(map: Map): number {
  return Object.keys(map).reduce((acc, coord) => {
    if (map[coord] > 1) return acc + 1;
    return acc;
  }, 0);
}
