// https://adventofcode.com/2021/day/19
// eacon Scanner

import { timeStamp } from 'console';
import { threadId } from 'worker_threads';
import { readInput } from '../../common';

const [player01, player02] = readInput('days/day21/demoInput', '\n').map((player) => Number(player.split(': ')[1]));

interface Player {
  score: number;
  pos: number;
}

function part01() {
  const players: { [index: string]: Player } = {
    p1: { score: 0, pos: player01 },
    p2: { score: 0, pos: player02 },
  };
  const dice = [1, 2, 3];
  let rolls = 0;
  let turn = 'p1';

  while (players.p1.score < 1000 && players.p2.score < 1000) {
    const player = players[turn];
    player.pos += dice[0] + dice[1] + dice[2];
    player.score += player.pos % 10 || 10;

    dice[0] += 3;
    dice[1] += 3;
    dice[2] += 3;
    turn = turn === 'p1' ? 'p2' : 'p1';
    rolls += 3;
  }

  return Math.min(players.p1.score, players.p2.score) * rolls;
}

let it = 0;
const w = [0, 0];

function roll(turn = 'p1', diceRoll: number, diceResult: number, p1: Player, p2: Player, wins: [number, number]): [number, number] {
  const nextTurn = diceRoll === 3 ? (turn === 'p1' ? 'p2' : 'p1') : turn;
  const player = turn === 'p1' ? p1 : p2;

  it += 1;
  if (it % 1000000 === 0) console.log(it, w);

  player.pos += diceResult;
  if (diceRoll === 3) {
    player.score += player.pos % 10 || 10;
    diceRoll = 0;
  }

  if (player.score >= 21) {
    if (turn === 'p1') w[0] += 1;
    else w[1] += 1;

    return wins;
  }

  const win1 = roll(nextTurn, diceRoll + 1, 1, { ...p1 }, { ...p2 }, [...wins]);
  const win2 = roll(nextTurn, diceRoll + 1, 2, { ...p1 }, { ...p2 }, [...wins]);
  const win3 = roll(nextTurn, diceRoll + 1, 3, { ...p1 }, { ...p2 }, [...wins]);

  return [win1[0] + win2[0] + win3[0], win1[1] + win2[1] + win3[1]];
}

function part02() {
  const win1 = roll('p1', 1, 1, { pos: player01, score: 0 }, { pos: player02, score: 0 }, [0, 0]);
  const win2 = roll('p1', 1, 2, { pos: player01, score: 0 }, { pos: player02, score: 0 }, [0, 0]);
  const win3 = roll('p1', 1, 3, { pos: player01, score: 0 }, { pos: player02, score: 0 }, [0, 0]);

  return [win1[0] + win2[0] + win3[0], win1[1] + win2[1] + win3[1]];
}

// 444356092776315
// 341960390180808
//       553480631

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
