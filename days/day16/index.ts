// https://adventofcode.com/2021/day/16
// Packet Decoder
import { readInput } from '../../common';

const input = readInput('days/day16/input', '\n')[0]
  .split('')
  .map((value) => `0000${parseInt(value, 16).toString(2)}`.slice(-4))
  .join('');

let part01Versions = 0;

function parseValue(binaries: string): [number, string] {
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

  const leftover = binaries.slice(literalsIndex + 5);

  return [number, leftover];
}

function getOperationValues(binaries: string): [number, string] {
  const TYPE_0_LENGTH = 15;
  const TYPE_1_LENGTH = 11;
  const lengthTypeId = binaries.slice(0, 1);

  if (lengthTypeId === '0') {
    const subPacketsLength = parseInt(binaries.slice(1, 1 + TYPE_0_LENGTH), 2);
    const subPacketsBits = binaries.slice(1 + TYPE_0_LENGTH, 1 + TYPE_0_LENGTH + subPacketsLength);
    const leftover = binaries.slice(1 + TYPE_0_LENGTH + subPacketsLength);

    console.log(` typeId: 0, ${subPacketsLength} sub-segments length`);

    const [value] = decode(subPacketsBits);
    return [value, leftover];
  }

  if (lengthTypeId === '1') {
    const numberOfSubSegments = parseInt(binaries.slice(1, 1 + TYPE_1_LENGTH), 2);
    const values = [];
    let subSegment = binaries.slice(1 + TYPE_1_LENGTH);

    console.log(` typeId: 1, ${numberOfSubSegments} sub-segments`);

    for (let i = 0; i < numberOfSubSegments; i += 1) {
      const [value, leftover] = decode(subSegment);
      values.push(value);
      subSegment = leftover;
      console.log(`  sub-segment ${i}:  ${value}`);
    }

    return [values[0], subSegment];
  }
}

function decode(binaries: string): [number, string] {
  const version = parseInt(binaries.slice(0, 3), 2);
  const type = parseInt(binaries.slice(3, 6), 2);
  part01Versions += version;

  console.log(`package: version: ${version} type: ${type}   --  ${binaries.length}`);

  if (type === 4) return parseValue(binaries.slice(6));
  return getOperationValues(binaries.slice(6));
}

function go() {
  const [value, leftover] = decode(input);

  process.stdout.write(`Part 01: ${part01Versions}\n`);
  process.stdout.write(`Part 02: ${value}  ${leftover.length}:${leftover}\n`);
}

go();
