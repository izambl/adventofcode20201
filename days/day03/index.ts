// https://adventofcode.com/2021/day/3
// Binary Diagnostic
import { readInput } from '../../common';

const input = readInput('days/day03/input').map((binary: string): string[] => binary.split(''));

const diagnostic = input.reduce<Array<{ 0: number; 1: number }>>((acc, value) => {
  for (let i = 0; i < value.length; i += 1) {
    acc[i] = acc[i] || { 0: 0, 1: 0 };

    if (value[i] === '0') acc[i][0] += 1;
    if (value[i] === '1') acc[i][1] += 1;
  }

  return acc;
}, []);

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
