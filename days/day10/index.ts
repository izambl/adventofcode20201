// https://adventofcode.com/2021/day/10
// Syntax Scoring
import { readInput } from '../../common';

const input = readInput('days/day10/input', '\n').map((line) => line.split(''));

const PAIRS: { [index: string]: { type: string; open?: string; close?: string } } = {
  '{': { type: 'open', close: '}' },
  '}': { type: 'close', open: '{' },
  '[': { type: 'open', close: ']' },
  ']': { type: 'close', open: '[' },
  '<': { type: 'open', close: '>' },
  '>': { type: 'close', open: '<' },
  '(': { type: 'open', close: ')' },
  ')': { type: 'close', open: '(' },
};

function part01() {
  const corruptedLines = [];
  const illegalSymbols: { [index: string]: number } = {
    '}': 0,
    ')': 0,
    ']': 0,
    '>': 0,
  };

  for (const line of input) {
    const comp = [];

    for (const symbol of line) {
      if (PAIRS[symbol].type === 'open') {
        comp.push(symbol);
      }
      if (PAIRS[symbol].type === 'close') {
        const openSymbol = comp.pop();
        if (openSymbol !== PAIRS[symbol].open) {
          corruptedLines.push(line);
          illegalSymbols[symbol] += 1;
          break;
        }
      }
    }
  }

  return illegalSymbols[')'] * 3 + illegalSymbols[']'] * 57 + illegalSymbols['}'] * 1197 + illegalSymbols['>'] * 25137;
}

function part02() {
  const scores: number[] = [];
  const PAIRS_SCORES: { [index: string]: number } = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
  };

  for (const line of input) {
    let corruptedLine = false;
    const comp = [];

    for (const symbol of line) {
      if (PAIRS[symbol].type === 'open') {
        comp.push(symbol);
      }
      if (PAIRS[symbol].type === 'close') {
        const openSymbol = comp.pop();
        if (openSymbol !== PAIRS[symbol].open) {
          corruptedLine = true;
          break;
        }
      }
    }

    if (!corruptedLine) {
      let x = null;
      let score = 0;

      while ((x = comp.pop())) {
        score *= 5;
        score += PAIRS_SCORES[x];
      }

      scores.push(score);
    }
  }

  scores.sort((a, b) => a - b);
  return scores[(scores.length - 1) / 2];
}

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
