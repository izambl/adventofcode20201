// https://adventofcode.com/2021/day/19
// eacon Scanner

import { readInput } from '../../common';

interface Positionable {
  x: number;
  y: number;
  z: number;
}

class Beacon implements Positionable {
  x: number;
  y: number;
  z: number;
  scanner: Scanner;
  permutations: Array<[number, number, number]>;
  distanceTo: [Beacon, number][];

  constructor(scanner: Scanner, x: number, y: number, z: number) {
    this.scanner = scanner;
    this.x = x;
    this.y = y;
    this.z = z;
    this.distanceTo = [];

    this.permutations = permutations(x, y, z);

    this.scanner.addBeacon(this);
  }
}

class Scanner implements Positionable {
  x: number;
  y: number;
  z: number;
  id: string;
  beacons: Set<Beacon>;
  beaconDistances: number[];

  constructor(id: string, x: number, y: number, z: number) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;

    this.beacons = new Set<Beacon>();
  }

  addBeacon(beacon: Beacon) {
    this.beacons.add(beacon);
  }
}

const scanners = readInput('days/day19/demoInput', '\n\n').map((group) => {
  const lines = group.split('\n');
  const scanner = new Scanner(lines.shift(), 0, 0, 0);

  for (const beaconPositions of lines) {
    const [x, y, z] = beaconPositions.split(',').map(Number);
    new Beacon(scanner, x, y, z);
  }

  return scanner;
});

function part01() {
  const distances: { [index: number]: any } = {};

  for (const scanner of scanners) {
    const beacons = [...scanner.beacons];

    for (let a = 0; a < beacons.length; a += 1) {
      for (let b = 0; b < beacons.length; b += 1) {
        const beaconA = beacons[a];
        const beaconB = beacons[b];

        const distance = Math.sqrt(
          Math.pow(beaconA.x - beaconB.x, 2) + Math.pow(beaconA.y - beaconA.y, 2) + Math.pow(beaconA.z - beaconB.z, 2)
        );

        beaconA.distanceTo.push([beaconB, distance]);
        beaconB.distanceTo.push([beaconA, distance]);

        distances[distance] = distances[distance] || [];
        distances[distance].push(beaconA);
        distances[distance].push(beaconB);
      }
    }
  }
}

part01();

function permutations(x: number, y: number, z: number): Array<[number, number, number]> {
  const permutations: Array<[number, number, number]> = [];

  permutations.push([x, z, -y]);
  permutations.push([x, -y, -z]);
  permutations.push([x, -z, -y]);
  permutations.push([x, y, z]);

  permutations.push([-x, y, -z]);
  permutations.push([-x, z, y]);
  permutations.push([-x, -y, z]);
  permutations.push([-x, -z, -y]);

  permutations.push([-y, x, z]);
  permutations.push([z, x, y]);
  permutations.push([y, x, -z]);
  permutations.push([-z, x, -y]);

  permutations.push([y, -x, z]);
  permutations.push([-z, -x, y]);
  permutations.push([-y, -x, -z]);
  permutations.push([z, -x, -y]);

  permutations.push([y, z, x]);
  permutations.push([-z, y, x]);
  permutations.push([-y, -z, x]);
  permutations.push([z, -y, x]);

  permutations.push([z, y, -x]);
  permutations.push([y, -z, -x]);
  permutations.push([-z, -y, -x]);
  permutations.push([-y, z, -x]);

  return permutations;
}
