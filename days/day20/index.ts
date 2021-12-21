// https://adventofcode.com/2021/day/19
// eacon Scanner

import { readInput } from '../../common';

const [algo, imageInput] = readInput('days/day20/input', '\n\n');
const image = imageInput.split('\n').map((line) => line.split(''));

type Led = string;
type Image = Array<Led[]>;

function part01() {
  let countOnLEds = 0;
  const eI = enhance(enhance(image), '#');
  print(eI);

  for (let y = 0; y < eI.length; y += 1) {
    for (let x = 0; x < eI[0].length; x += 1) {
      countOnLEds += eI[y][x] === '#' ? 1 : 0;
    }
  }

  process.stdout.write(`Part 01: ${countOnLEds}\n`);
}

function part02() {
  let countOnLEds = 0;
  let emptySpace = '#';
  let rounds = 50;
  let eI = image;

  while (rounds--) {
    emptySpace = emptySpace === '#' ? '.' : '#';
    eI = enhance(eI, emptySpace);
  }

  print(eI);

  for (let y = 0; y < eI.length; y += 1) {
    for (let x = 0; x < eI[0].length; x += 1) {
      countOnLEds += eI[y][x] === '#' ? 1 : 0;
    }
  }

  process.stdout.write(`Part 01: ${countOnLEds}\n`);
}

function enhance(image: Image, emptySpace: Led = '.'): Image {
  const growFactor = 2;
  const yLen = image.length + growFactor * 2;
  const xLen = image[0].length + growFactor * 2;
  const gI: Image = [...Array(yLen)].map(() => [...Array(xLen)].fill(emptySpace));
  const eI: Image = [...Array(yLen)].map(() => [...Array(xLen)].fill(emptySpace));

  for (let y = 0; y < image.length; y += 1) {
    for (let x = 0; x < image[0].length; x += 1) {
      gI[y + growFactor][x + growFactor] = image[y][x];
    }
  }

  for (let y = 0; y < gI.length; y += 1) {
    for (let x = 0; x < gI[0].length; x += 1) {
      const bin = [];

      bin.push(gI[y - 1]?.[x - 1] || emptySpace);
      bin.push(gI[y - 1]?.[x] || emptySpace);
      bin.push(gI[y - 1]?.[x + 1] || emptySpace);
      bin.push(gI[y]?.[x - 1] || emptySpace);
      bin.push(gI[y]?.[x] || emptySpace);
      bin.push(gI[y]?.[x + 1] || emptySpace);
      bin.push(gI[y + 1]?.[x - 1] || emptySpace);
      bin.push(gI[y + 1]?.[x] || emptySpace);
      bin.push(gI[y + 1]?.[x + 1] || emptySpace);

      const newLed = algo[parseInt(bin.join('').replace(/\./g, '0').replace(/#/g, '1'), 2)];

      eI[y][x] = newLed;
    }
  }

  return eI;
}

function print(image: Image): void {
  for (let y = 0; y < image.length; y += 1) {
    process.stdout.write(`${image[y].join('')}\n`);
  }
}

part01();
part02();
