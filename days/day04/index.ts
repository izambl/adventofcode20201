// https://adventofcode.com/2021/day/4
// Giant Squid
import { cloneDeep } from 'lodash';
import { readInput } from '../../common';

const [numbersInput, ...bingoCardsInput] = readInput('days/day04/input', '\n\n');

const bingoNumbers = numbersInput.split(',').map(Number);
const bingoCards = bingoCardsInput.map((bingoCardInput) => {
  return bingoCardInput
    .replace(/ {2}/g, ' ')
    .split('\n')
    .map((bingoCardLine) => {
      if (bingoCardLine[0] !== ' ') return bingoCardLine.split(' ').map(Number);

      return bingoCardLine.slice(1).split(' ').map(Number);
    });
});

function playBingo(cards: Array<number[][]>, numbers: number[]): [number[][], number] {
  let winner = null;
  let nextNumber = null;

  while (!winner) {
    nextNumber = numbers.shift();
    if (nextNumber === undefined) break;

    markCards(cards, nextNumber);

    winner = findWinner(cards);
  }
  return [winner, nextNumber];
}

function playBongo(cards: Array<number[][]>, numbers: number[]): [number[][], number] {
  let loser = null;
  let nextNumber = null;
  let lastwinner = null;

  while (!loser) {
    nextNumber = numbers.shift();
    if (nextNumber === undefined) break;

    markCards(cards, nextNumber);

    let winner = null;
    while ((winner = findWinner(cards))) {
      lastwinner = cards.splice(cards.indexOf(winner), 1)[0];
    }
    if (cards.length === 0) {
      loser = lastwinner;
    }
  }

  return [loser, nextNumber];
}

function markCards(cards: Array<number[][]>, number: number) {
  for (const card of cards) {
    for (const line of card) {
      for (let i = 0; i < line.length; i += 1) {
        if (line[i] === number) line[i] = null;
      }
    }
  }
}

function findWinner(cards: Array<number[][]>): number[][] {
  for (const card of cards) {
    // Check lines
    const completedLine = card.find((line) => line.every((num) => num === null));
    if (completedLine) return card;

    // Check column
    for (let column = 0; column < card[0].length; column += 1) {
      let completed = true;
      for (let line = 0; line < card.length; line += 1) {
        completed = completed && card[line][column] === null;
      }
      if (completed) return card;
    }
  }

  return null;
}

const [winnerCard, lastNumber] = playBingo(cloneDeep(bingoCards), cloneDeep(bingoNumbers));
printResult(winnerCard, lastNumber);

const [winnerCard2, lastNumber2] = playBongo(cloneDeep(bingoCards), cloneDeep(bingoNumbers));
printResult(winnerCard2, lastNumber2);

function printResult(card: number[][], winnerNumber: number) {
  let sum = 0;

  for (const line of card) {
    sum += line.reduce((total, num) => total + (num || 0), 0);
  }

  console.log(sum * winnerNumber);
}
