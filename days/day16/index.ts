// https://adventofcode.com/2021/day/16
// Packet Decoder
import { readInput } from '../../common';

const input = readInput('days/day16/input', '\n')[0]
  .split('')
  .map((value) => `0000${parseInt(value, 16).toString(2)}`.slice(-4))
  .join('');

let versions = 0;

function parseType4Literals(binaries: string): [number, string[]] {
  let literalsIndex = 0;
  const subSegments = [];
  let subSegment = binaries.slice(literalsIndex, literalsIndex + 5);

  subSegments.push(subSegment);

  while (subSegment[0] !== '0') {
    literalsIndex += 5;
    subSegment = binaries.slice(literalsIndex, literalsIndex + 5);
    subSegments.push(subSegment);
  }

  const number = parseInt(
    subSegments.reduce((acc: string, sub: string) => {
      return `${acc}${sub.slice(1)}`;
    }, ''),
    2
  );

  return [number, subSegments];
}

function getOperationValues(binaries: string) {
  const lengthTypeId = binaries.slice(6, 7);

  if (lengthTypeId === '0') {
    const subPacketsLength = parseInt(binaries.slice(7, 22), 2);
    console.log('Sub packet length', subPacketsLength);
    const subPacketsBits = binaries.slice(22, 22 + subPacketsLength);
    const leftover = binaries.slice(22 + subPacketsLength);

    doSegment(subPacketsBits);
    if (leftover) doSegment(leftover);
  }

  if (lengthTypeId === '1') {
    const numberOfSubSegments = parseInt(binaries.slice(7, 18), 2);
    console.log('Number of segments', numberOfSubSegments);
    const subSegment = binaries.slice(18);
    doSegment(subSegment);
  }
}

function doSegment(binaries: string) {
  const version = parseInt(binaries.slice(0, 3), 2);
  const type = parseInt(binaries.slice(3, 6), 2);
  versions += version;

  console.log(`Package: version: ${version} type: ${type}`);

  if (type === 4) {
    const [number, subSegments] = parseType4Literals(binaries.slice(6));

    const leftover = binaries.slice(6 + subSegments.length * 5);

    console.log('LITERAL', number);
    if (leftover) doSegment(leftover);
  } else {
    const opValues = getOperationValues(binaries);
  }
}

function part01() {
  doSegment(input);

  return versions;
}

function part02() {
  // doSegment(input);
}

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
