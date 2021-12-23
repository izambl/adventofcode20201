// https://adventofcode.com/2021/day/22
// Reactor Reboot

import { readInput } from '../../common';

interface Cuboid {
  [index: string]: { from: number; to: number };
}

const input: Array<[string, Cuboid]> = readInput('days/day22/input', '\n').map((instruction) => {
  const line = instruction.split(' ');
  const inst: Cuboid = {};
  line[1].split(',').forEach((coor) => {
    const xyz = coor.split('=');
    const nums = xyz[1].split('..');

    inst[xyz[0]] = { from: Math.min(Number(nums[0]), Number(nums[1])), to: Math.max(Number(nums[0]), Number(nums[1])) };
    return null;
  });

  return [line[0], inst];
});

function part01() {
  const cubeMap: { [index: string]: string } = {};
  let countOn = 0;

  for (const [status, cuboid] of input) {
    if (cuboid.x.from < -50 || cuboid.y.from < -50 || cuboid.z.from < -50) continue;
    if (cuboid.x.to > 50 || cuboid.y.to > 50 || cuboid.z.to > 50) continue;

    for (let x = cuboid.x.from; x <= cuboid.x.to; x += 1) {
      for (let y = cuboid.y.from; y <= cuboid.y.to; y += 1) {
        for (let z = cuboid.z.from; z <= cuboid.z.to; z += 1) {
          cubeMap[`${x},${y},${z}`] = status;
        }
      }
    }
  }

  for (const cube of Object.keys(cubeMap)) {
    if (cubeMap[cube] === 'on') countOn++;
  }

  return countOn;
}

function part02() {
  const cubeMap: { [index: string]: string } = {};
  let countOn = 0;

  for (const [status, cuboid] of input) {
    console.log('Cuboid', cuboid);
    for (let x = cuboid.x.from; x <= cuboid.x.to; x += 1) {
      for (let y = cuboid.y.from; y <= cuboid.y.to; y += 1) {
        for (let z = cuboid.z.from; z <= cuboid.z.to; z += 1) {
          cubeMap[`${x},${y},${z}`] = status;
        }
      }
    }
  }

  for (const cube of Object.keys(cubeMap)) {
    if (cubeMap[cube] === 'on') countOn++;
  }

  return countOn;
}

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
