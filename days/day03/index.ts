// https://adventofcode.com/2021/day/3
// Binary Diagnostic
import { readInput } from '../../common';

const input = readInput('days/day03/input');

const diagnostic = getBitFrequency(input);

const gammaRate = diagnostic
  .map((dr): string => {
    if (dr[0] > dr[1]) return '0';
    return '1';
  })
  .join('');
const epilsonRate = diagnostic
  .map((dr): string => {
    if (dr[0] > dr[1]) return '1';
    return '0';
  })
  .join('');

console.log(gammaRate, epilsonRate, parseInt(gammaRate, 2) * parseInt(epilsonRate, 2));

function getBitFrequency(binariesArray: string[]): Array<{ 0: number; 1: number }> {
  return binariesArray.reduce<Array<{ 0: number; 1: number }>>((acc, value) => {
    for (let i = 0; i < value.length; i += 1) {
      acc[i] = acc[i] || { 0: 0, 1: 0 };

      if (value[i] === '0') acc[i][0] += 1;
      if (value[i] === '1') acc[i][1] += 1;
    }

    return acc;
  }, []);
}

console.log('OGR', geValue(input, 'ogr'), parseInt(geValue(input, 'ogr'), 2));
console.log('CSR', geValue(input, 'csr'), parseInt(geValue(input, 'csr'), 2));
console.log('Part 2', parseInt(geValue(input, 'csr'), 2) * parseInt(geValue(input, 'ogr'), 2));

function geValue(binaries: string[], type: 'ogr' | 'csr', index: number = 0): string {
  if (binaries.length === 1) return binaries[0];

  const relevatBits = binaries.map((i: string): string => i[index]);
  const filter = type === 'ogr' ? mostRecurrent(relevatBits) : leastRecurrent(relevatBits);

  const filteredBinaries = binaries.filter((binary) => binary[index] === filter);

  return geValue(filteredBinaries, type, index + 1);
}

function mostRecurrent(array: string[]): string {
  const map: { [index: string]: number } = {};

  for (const bit of array) {
    map[bit] = map[bit] + 1 || 1;
  }

  if (map[1] >= map[0]) return '1';
  return '0';
}

function leastRecurrent(array: string[]): string {
  const map: { [index: string]: number } = {};

  for (const bit of array) {
    map[bit] = map[bit] + 1 || 1;
  }

  if (map[1] >= map[0]) return '0';
  return '1';
}
