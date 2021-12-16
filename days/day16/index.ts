// https://adventofcode.com/2021/day/16
// Packet Decoder
import { readInput } from '../../common';

const input = readInput('days/day16/demoInput', '\n')[0]
  .split('')
  .map((value) => `0000${parseInt(value, 16).toString(2)}`.slice(-4))
  .join('');

function versionAndType(binaries: string) {
  const version = parseInt(binaries.slice(0, 3), 2);
  const type = parseInt(binaries.slice(3, 6), 2);

  return [version, type];
}

function part01() {
  const [version, type] = versionAndType(input);
  console.log(version, type);
}
function part02() {}

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
