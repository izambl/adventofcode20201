// https://adventofcode.com/2021/day/9
// Smoke Basin
import { readInput } from '../../common';

const input = readInput('days/day09/input', '\n').map((row) => row.split('').map(Number));

function lowPoints(input2: Array<number[]>): Array<[number, number]> {
  const lowPointsMap: Array<[number, number]> = [];

  for (let y = 0; y < input2.length; y += 1) {
    const row = input2[y];
    for (let x = 0; x < row.length; x += 1) {
      const currentPointValue = input2[y][x];

      if (currentPointValue >= input2[y]?.[x - 1] ?? 0) continue;
      if (currentPointValue >= input2[y - 1]?.[x] ?? 0) continue;
      if (currentPointValue >= input2[y + 1]?.[x] ?? 0) continue;
      if (currentPointValue >= input2[y]?.[x + 1] ?? 0) continue;

      lowPointsMap.push([y, x]);
    }
  }

  return lowPointsMap;
}

function part01() {
  const lp = lowPoints(input);

  const lpRisk = lp.reduce((acc, [y, x]) => {
    return acc + 1 + input[y][x];
  }, 0);

  process.stdout.write(`Part 01: ${lpRisk}\n`);
}

function findBasin([y, x]: [number, number], basinMap: Set<string>): Set<string> {
  basinMap.add(`${y}-${x}`);

  if (input[y - 1]?.[x] !== undefined && input[y - 1][x] !== 9) {
    if (!basinMap.has(`${y - 1}-${x}`)) findBasin([y - 1, x], basinMap);
    basinMap.add(`${y - 1}-${x}`);
  }

  if (input[y]?.[x - 1] !== undefined && input[y][x - 1] !== 9) {
    if (!basinMap.has(`${y}-${x - 1}`)) findBasin([y, x - 1], basinMap);
    basinMap.add(`${y}-${x - 1}`);
  }

  if (input[y + 1]?.[x] !== undefined && input[y + 1][x] !== 9) {
    if (!basinMap.has(`${y + 1}-${x}`)) findBasin([y + 1, x], basinMap);
    basinMap.add(`${y + 1}-${x}`);
  }

  if (input[y]?.[x + 1] !== undefined && input[y][x + 1] !== 9) {
    if (!basinMap.has(`${y}-${x + 1}`)) findBasin([y, x + 1], basinMap);
    basinMap.add(`${y}-${x + 1}`);
  }

  return basinMap;
}

function part02() {
  const lps = lowPoints(input);
  const basinSizes = [];

  for (const lp of lps) {
    const basin = findBasin(lp, new Set<string>());
    basinSizes.push(basin.size);
  }

  basinSizes.sort((a, b) => b - a);

  process.stdout.write(`Part 02: ${basinSizes[0] * basinSizes[1] * basinSizes[2]}\n`);
}

part01();

part02();
