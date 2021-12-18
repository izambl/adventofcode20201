// https://adventofcode.com/2021/day/17
// Trick Shot

import { readInput } from '../../common';

const [xInput, yInput] = readInput('days/day17/input', '\n')[0].replace('target area: ', '').split(', ');
const [x1, x2] = xInput.replace('x=', '').split('..').map(Number);
const [y1, y2] = yInput.replace('y=', '').split('..').map(Number);

function part01() {
  // find possible X
  const xs = findXs(x1, x2);
  const validYs = new Set<number>();
  for (const x of xs) {
    const xys = findYs(x, y1, y2, x1, x2);
    xys.forEach((y) => {
      validYs.add(y);
    });
  }
  let highestY = Math.max(...[...validYs]);
  let highest = 0;

  while (highestY) {
    highest += highestY--;
  }

  process.stdout.write(`Part 01: ${highest}\n`);
}

function part02() {
  // find possible X
  const xs = findXs(x1, x2);
  let totalOptions = 0;

  for (const x of xs) {
    const xys = findYs(x, y1, y2, x1, x2);
    totalOptions += xys.size;
  }

  process.stdout.write(`Part 02: ${totalOptions}\n`);
}

function findYs(x: number, minY: number, maxY: number, minX: number, maxX: number): Set<number> {
  const possibleYs = new Set<number>();
  let y = minY;

  do {
    let walkingX = 0;
    let walkingY = 0;
    let ya = y;
    let xa = x;

    do {
      walkingX += xa;
      walkingY += ya;

      if (walkingY >= minY && walkingY <= maxY && walkingX >= minX && walkingX <= maxX) possibleYs.add(y);

      xa = xa - 1 > 0 ? xa - 1 : 0;
      ya -= 1;
    } while (walkingY >= minY && walkingX <= maxX);

    y++;
  } while (y < 1000);

  return possibleYs;
}

function findXs(minX: number, maxX: number): Set<number> {
  const possibleXs = new Set<number>();
  let x = 0;

  do {
    let walkingX = 0;
    let xa = x;

    do {
      walkingX += xa;
      if (walkingX >= minX && walkingX <= maxX) possibleXs.add(x);
    } while (--xa >= 0);

    x++;
  } while (x <= maxX);

  return possibleXs;
}

part01();
part02();
