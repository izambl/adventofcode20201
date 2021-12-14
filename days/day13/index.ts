// https://adventofcode.com/2021/day/12
// Passage Pathing
import { readInput } from '../../common';

const [inputA, inputB] = readInput('days/day13/input', '\n\n');
const sheet = inputA.split('\n').map((coord) => coord.split(',').map(Number));
const folds = inputB.split('\n').map((fold) => {
  const [axis, num] = fold.replace('fold along ', '').split('=');

  return [axis, Number(num)];
});

type Fold = [string, number];

function printSheet(sheetToPrint: Set<string>) {
  let ylength = 0;
  let xlength = 0;
  for (const coord of sheetToPrint) {
    const [x, y] = coord.split('-').map(Number);
    if (xlength < x) xlength = x;
    if (ylength < y) ylength = y;
  }

  process.stdout.write('Part 02:\n');
  for (let y = 0; y <= ylength; y += 1) {
    for (let x = 0; x <= xlength; x += 1) {
      if (sheetToPrint.has(`${x}-${y}`)) process.stdout.write('#');
      else process.stdout.write(' ');
    }
    process.stdout.write('\n');
  }
}

function solve() {
  let numberOfFolds = 0;
  const sheetMap = new Set<string>();
  const sheetSize = [0, 0];

  for (const [x, y] of sheet) {
    if (x > sheetSize[0]) sheetSize[0] = x;

    sheetMap.add(`${x}-${y}`);
  }

  const finalSheet = folds.reduce((lastSheet, [axis, num]: Fold) => {
    const foldedSheet = new Set<string>();
    numberOfFolds += 1;

    if (axis === 'y') {
      for (const coord of lastSheet) {
        const [x, y] = coord.split('-').map(Number);
        if (y < num) foldedSheet.add(`${x}-${y}`);
        if (y > num) {
          const newY = num - (y - num);
          foldedSheet.add(`${x}-${newY}`);
        }
      }
    }

    if (axis === 'x') {
      for (const coord of lastSheet) {
        const [x, y] = coord.split('-').map(Number);
        if (x < num) foldedSheet.add(`${x}-${y}`);
        if (x > num) {
          const newX = num - (x - num);
          foldedSheet.add(`${newX}-${y}`);
        }
      }
    }

    if (numberOfFolds === 1) process.stdout.write(`Part 01: ${foldedSheet.size}\n`);

    return foldedSheet;
  }, sheetMap);

  printSheet(finalSheet);

  return finalSheet.size;
}

solve();
