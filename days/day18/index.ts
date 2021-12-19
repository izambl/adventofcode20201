// https://adventofcode.com/2021/day/18
// Snailfish

import { readInput } from '../../common';

const input = readInput('days/day18/input', '\n').map((line) => JSON.parse(line));

let pairMap = new Map<number, Value>();
let pairId = 0;
function storeMap(pair: Value): number {
  pairId += 1;

  pairMap.set(pairId, pair);

  return pairId;
}

interface Snail {
  id: number;
  parent?: Pair;
  level: number;
  value: number;
  isPair: () => boolean;
  updateParent: (pair: Pair) => void;
  toString: () => string;
  toStringIds: () => string;
  childrenWithValue10: () => Value;
  childrenWithLevel4: () => Pair;
  magnitude: () => number;
}

class Value implements Snail {
  parent: Pair;
  level: number;
  id: number;
  value: number;

  constructor(value: number, parent: Pair = null) {
    this.parent = parent;
    this.level = parent ? parent.level + 1 : 0;
    this.value = value;

    this.id = storeMap(this);
  }

  isPair() {
    return false;
  }

  updateParent(parent: Pair) {
    this.parent = parent;
    this.level = parent.level + 1;
  }

  toString(): string {
    return `${this.value}`;
  }

  toStringIds(): string {
    return `${this.id}|`;
  }

  split() {
    const left = Math.floor(this.value / 2);
    const right = Math.ceil(this.value / 2);

    const newPair = new Pair([left, right], true, this.parent);

    if (this.parent.left === this) this.parent.left = newPair;
    if (this.parent.right === this) this.parent.right = newPair;

    pairMap.delete(this.id);

    // process.stdout.write(`Splitting ${this}\n`);
  }

  childrenWithLevel4(): Pair {
    return null;
  }

  childrenWithValue10(): Value {
    if (this.value >= 10) return this;
    return null;
  }

  magnitude(): number {
    return this.value;
  }
}

class Pair implements Snail {
  left: Snail;
  right: Snail;
  parent: Pair;
  level: number;
  id: number;
  value: number;

  constructor([left, right]: any, firstRun: boolean = false, parent: Pair = null) {
    this.parent = parent;
    this.level = parent ? parent.level + 1 : 0;
    this.value = 0;

    if (firstRun) {
      this.left = Array.isArray(left) ? new Pair(left, true, this) : new Value(left, this);
      this.right = Array.isArray(right) ? new Pair(right, true, this) : new Value(right, this);
    } else {
      this.left = left;
      this.right = right;
      this.left.updateParent(this);
      this.right.updateParent(this);
    }
  }

  isPair() {
    return true;
  }

  updateParent(parent: Pair) {
    this.parent = parent;
    this.level = parent.level + 1;

    this.right.updateParent(this);
    this.left.updateParent(this);
  }

  toString(): string {
    return `[${this.left}, ${this.right}]:${this.level}`;
  }

  toStringIds(): string {
    return `${this.left.toStringIds()}${this.right.toStringIds()}`;
  }

  static findRight(value: Value): Value {
    let parent = value.parent;
    while (parent.parent !== null) parent = parent.parent;

    const ids: number[] = parent.toStringIds().slice(0, -1).split('|').map(Number);
    const index = ids.indexOf(value.id) + 1;

    return pairMap.get(ids[index]);
  }

  static findLeft(value: Value): Value {
    let parent = value.parent;
    while (parent.parent !== null) parent = parent.parent;

    const ids: number[] = parent.toStringIds().slice(0, -1).split('|').map(Number);
    const index = ids.indexOf(value.id) - 1;

    return pairMap.get(ids[index]);
  }

  explode() {
    const newZeroValue = new Value(0, this.parent);

    if (this.parent.left === this) this.parent.left = newZeroValue;
    if (this.parent.right === this) this.parent.right = newZeroValue;

    const right = Pair.findRight(newZeroValue);
    const left = Pair.findLeft(newZeroValue);

    if (left) left.value += this.left.value;
    if (right) right.value += this.right.value;

    // process.stdout.write(`Exploding ${this}\n`);
  }

  reduce() {
    let reduceCandidate = false;

    do {
      reduceCandidate = false;

      const level4 = this.childrenWithLevel4();
      if (level4) {
        level4.explode();
        reduceCandidate = true;
        // process.stdout.write(`Reduced: ${this}\n`);
        continue;
      }

      const value10 = this.childrenWithValue10();
      if (value10) {
        value10.split();
        reduceCandidate = true;
        // process.stdout.write(`Splirted: ${this}\n`);
      }
    } while (reduceCandidate);

    return this;
  }

  childrenWithLevel4(): Pair {
    if (this.level == 4) return this;

    if (this.left.childrenWithLevel4()) return this.left.childrenWithLevel4();
    if (this.right.childrenWithLevel4()) return this.right.childrenWithLevel4();

    return null;
  }

  childrenWithValue10(): Value {
    if (this.left.childrenWithValue10()) return this.left.childrenWithValue10();
    if (this.right.childrenWithValue10()) return this.right.childrenWithValue10();

    return null;
  }

  magnitude(): number {
    return this.left.magnitude() * 3 + this.right.magnitude() * 2;
  }
}

function part01() {
  const pairInput: Pair[] = input.map((line) => new Pair(line, true));

  const final: Pair = pairInput.reduce((acc: Pair, pair: Pair): Pair => {
    const sum = acc ? new Pair([acc, pair], false, null) : pair;

    // process.stdout.write(`\n\nSum: ${sum}\n`);

    return sum.reduce();
  }, null);

  process.stdout.write(`\nFinal: ${final}\n`);
  process.stdout.write(`\nPart01: ${final.magnitude()}\n`);
}

function part02() {
  const magnitudes = new Set<number>();

  for (let i = 0; i < input.length; i += 1) {
    for (let j = 0; j < input.length; j += 1) {
      if (i == j) continue;
      pairMap = new Map<number, Value>();
      const pairInput: Pair[] = input.map((line) => new Pair(line, true));

      const sumPair = new Pair([pairInput[i], pairInput[j]], false, null);

      magnitudes.add(sumPair.reduce().magnitude());
    }
  }

  process.stdout.write(`Part 02: ${Math.max(...[...magnitudes])}\n`);
}

part01();
part02();
