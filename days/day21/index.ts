// https://adventofcode.com/2021/day/19
// eacon Scanner

import { readInput } from '../../common';

const [player01, player02] = readInput('days/day21/input', '\n').map((player) => Number(player.split(': ')[1]));

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

function roll(turn: string, diceResult: number, p1: Player, p2: Player, wins: [number, number], multiplier: number): [number, number] {
  const nextTurn = turn === 'p1' ? 'p2' : 'p1';
  const player = turn === 'p2' ? p2 : p1;

  player.pos += diceResult;
  if (diceResult) player.score += player.pos % 10 || 10;

  if (player.score >= 21) {
    if (turn === 'p1') {
      wins[0] += multiplier;
    } else {
      wins[1] += multiplier;
    }

    return wins;
  }

  const win1 = roll(nextTurn, 3, { ...p1 }, { ...p2 }, [...wins], multiplier * 1);
  const win2 = roll(nextTurn, 4, { ...p1 }, { ...p2 }, [...wins], multiplier * 3);
  const win3 = roll(nextTurn, 5, { ...p1 }, { ...p2 }, [...wins], multiplier * 6);
  const win4 = roll(nextTurn, 6, { ...p1 }, { ...p2 }, [...wins], multiplier * 7);
  const win5 = roll(nextTurn, 7, { ...p1 }, { ...p2 }, [...wins], multiplier * 6);
  const win6 = roll(nextTurn, 8, { ...p1 }, { ...p2 }, [...wins], multiplier * 3);
  const win7 = roll(nextTurn, 9, { ...p1 }, { ...p2 }, [...wins], multiplier * 1);

  return [wins, win1, win2, win3, win4, win5, win6, win7].reduce(
    (acc, win) => {
      return [acc[0] + win[0], acc[1] + win[1]];
    },
    [0, 0]
  );
}

function part02() {
  const res = roll('', 0, { pos: player01, score: 0 }, { pos: player02, score: 0 }, [0, 0], 1);

  return res;
}

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
