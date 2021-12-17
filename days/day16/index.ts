// https://adventofcode.com/2021/day/16
// Packet Decoder
import { readInput } from '../../common';

const input = readInput('days/day16/input', '\n')[0]
  .split('')
  .map((value) => `0000${parseInt(value, 16).toString(2)}`.slice(-4))
  .join('');

let versions = 0;

function parseSegment(binaries: string) {
  const version = parseInt(binaries.slice(0, 3), 2);
  const type = parseInt(binaries.slice(3, 6), 2);

  versions += version;

  console.log(`Package: version: ${version} type: ${type}`);

  if (type === 4) {
    let literalsIndex = 6;
    let subSegment = binaries.slice(literalsIndex, literalsIndex + 5);
    let numberOfSubSegments = 1;
    while (subSegment[0] !== '0') {
      literalsIndex += 5;
      numberOfSubSegments += 1;
      subSegment = binaries.slice(literalsIndex, literalsIndex + 5);
    }
    const subPackageBits = 6 + numberOfSubSegments * 5;
    const leftover = binaries.slice(literalsIndex + 5);
    console.log('LEFTOVER', leftover.length, subPackageBits);
    if (leftover) parseSegment(leftover);
  } else {
    const lengthTypeId = binaries.slice(6, 7);
    console.log('Length type ID', lengthTypeId);

    if (lengthTypeId === '0') {
      const subPacketsLength = parseInt(binaries.slice(8, 22), 2);
      console.log('Sub packet length', subPacketsLength);
      const subPacketsBits = binaries.slice(22, 22 + subPacketsLength);
      const leftover = binaries.slice(22 + subPacketsLength);

      parseSegment(subPacketsBits);
      if (leftover) parseSegment(leftover);
    }

    if (lengthTypeId === '1') {
      const numberOfSubSegments = parseInt(binaries.slice(8, 18), 2);
      console.log('Number of segments', numberOfSubSegments);
      const subSegment = binaries.slice(18);
      parseSegment(subSegment);
    }
  }
}

function part01() {
  parseSegment(input);

  return versions;
}

function part02() {}

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
