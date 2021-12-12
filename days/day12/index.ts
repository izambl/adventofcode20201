// https://adventofcode.com/2021/day/12
// Passage Pathing
import { readInput } from '../../common';

const input = readInput('days/day12/input', '\n').map((line) => line.split('-'));

class Node {
  name: string;

  neighbors: Set<Node>;

  small: boolean;

  constructor(name: string) {
    this.name = name;
    this.neighbors = new Set();

    this.small = name === name.toLowerCase();
  }

  addNeighbor(node: Node) {
    this.neighbors.add(node);
  }
}

function inputGraph() {
  const nodeMap: { [index: string]: Node } = {};

  for (const [from, to] of input) {
    if (!nodeMap[from]) nodeMap[from] = new Node(from);
    if (!nodeMap[to]) nodeMap[to] = new Node(to);

    nodeMap[from].addNeighbor(nodeMap[to]);
    nodeMap[to].addNeighbor(nodeMap[from]);
  }

  return nodeMap;
}

function findPaths(from: Node, destination: Node, currentPath: Node[] = [], foundPaths: string[] = []): string[] {
  if (from === destination) {
    foundPaths.push(currentPath.map((node) => node.name).join('->'));
    return foundPaths;
  }

  for (const neighbor of from.neighbors) {
    if (neighbor.name === 'start') continue;
    if (neighbor.small && currentPath.includes(neighbor)) continue;

    const nextPath = [...currentPath];
    nextPath.push(neighbor);
    findPaths(neighbor, destination, nextPath, foundPaths);
  }

  return foundPaths;
}

function findPaths2(from: Node, destination: Node, secondVisit: Node, currentPath: Node[] = [], foundPaths: string[] = []): string[] {
  if (from === destination) {
    foundPaths.push(currentPath.map((node) => node.name).join('->'));

    return foundPaths;
  }

  for (const neighbor of from.neighbors) {
    if (neighbor.name === 'start') continue;
    if (neighbor.small && currentPath.includes(neighbor)) {
      if (neighbor !== secondVisit) continue;
      if (currentPath.filter((node) => node === neighbor).length === 2) continue;
    }

    const nextPath = [...currentPath];
    nextPath.push(neighbor);
    findPaths2(neighbor, destination, secondVisit, nextPath, foundPaths);
  }

  return foundPaths;
}

function part01() {
  const map = inputGraph();

  const allPaths = findPaths(map.start, map.end, [map.start]);

  return allPaths.length;
}

function part02() {
  const map = inputGraph();
  const paths = new Set();

  const smallCaves = Object.keys(map).filter((node) => map[node].small && map[node].name !== 'start' && map[node].name !== 'end');

  for (const cave of smallCaves) {
    const foundPaths = findPaths2(map.start, map.end, map[cave], [map.start]);
    for (const path of foundPaths) paths.add(path);
  }

  return paths.size;
}

process.stdout.write(`Part 01: ${part01()}\n`);
process.stdout.write(`Part 02: ${part02()}\n`);
