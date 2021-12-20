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

function getOperationValues(binaries: string, type: number): [number, string] {
  const TYPE_ID_0_LENGTH = 15;
  const TYPE_ID_1_LENGTH = 11;
  const lengthTypeId = binaries.slice(0, 1);

  const values = [];
  let leftover = '';

  if (lengthTypeId === '0') {
    const subPacketsLength = parseInt(binaries.slice(1, 1 + TYPE_ID_0_LENGTH), 2);
    leftover = binaries.slice(1 + TYPE_ID_0_LENGTH + subPacketsLength);

    let subPacketsBits = binaries.slice(1 + TYPE_ID_0_LENGTH, 1 + TYPE_ID_0_LENGTH + subPacketsLength);
    let value = null;

    do {
      [value, subPacketsBits] = decode(subPacketsBits);
      values.push(value);
    } while (subPacketsBits);
  }

  if (lengthTypeId === '1') {
    const numberOfSubSegments = parseInt(binaries.slice(1, 1 + TYPE_ID_1_LENGTH), 2);
    let subSegment = binaries.slice(1 + TYPE_ID_1_LENGTH);

    for (let i = 0; i < numberOfSubSegments; i += 1) {
      const [value, leftover] = decode(subSegment);
      values.push(value);
      subSegment = leftover;
    }

    leftover = subSegment;
  }

  return [processValues(values, type), leftover];
}

function processValues(values: number[], operation: number): number {
  if (operation === 0) {
    return values.reduce((acc, value) => acc + value, 0);
  }
  if (operation === 1) {
    return values.reduce((acc, value) => acc * value, 1);
  }
  if (operation === 2) {
    return Math.min(...values);
  }
  if (operation === 3) {
    return Math.max(...values);
  }
  if (operation === 5) {
    return values[0] > values[1] ? 1 : 0;
  }
  if (operation === 6) {
    return values[0] < values[1] ? 1 : 0;
  }
  if (operation === 7) {
    return values[0] === values[1] ? 1 : 0;
  }

  return 0;
}

function decode(binaries: string): [number, string] {
  const version = parseInt(binaries.slice(0, 3), 2);
  const type = parseInt(binaries.slice(3, 6), 2);
  const binariesContent = binaries.slice(6);

  part01Versions += version;

  console.log(`package: version: ${version} type: ${type}`);

  if (type === 4) return parseValue(binariesContent);

  return getOperationValues(binariesContent, type);
}

function go() {
  const [value, leftover] = decode(input);

  process.stdout.write(`Part 01: ${part01Versions}\n`);
  process.stdout.write(`Part 02: ${value}  ${leftover.length}:${leftover}\n`);
}

go();
