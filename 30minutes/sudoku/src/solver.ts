import { S } from "./consts";

// 22 sec

export const solve = (set: S, render: (s: S, original: S, a?: number[][]) => void) => {
  const newSet = [...set];



  const a = getPossibleNumbers(set);

  const seq = genSequence(set, a);
  console.log("seq", seq);

  render(set, set, a);

  const t1 = performance.now();
  const solution = bruteForce(newSet, seq, a);
  const t2 = performance.now();

  if (solution) {
    console.log("solved in ", t2 - t1, "ms");
    console.log("solution", solution, set);
    render(solution, set);
  } else {
    console.log("not solved in ", t2 - t1, "ms");
  }
};

/**
 * Generates best sequence for solution
 * @param set
 */
export const genSequence = (set: S, possibleNumbers: number[][]) => {
  const res: number[] = [];
  for (let i = 0; i < set.length; i++) {
    if (!set[i]) {
      // 0 as well as undefined is "no number"
      res.push(i);
    }
  }

  // select first number with less possibilities. They should fail first
  return res.sort((a, b) => possibleNumbers[a].length - possibleNumbers[b].length);
};

const bruteForce = (set: S, seq: number[], possibleNumber: number[][]) => {
  const [current, ...next] = seq;
  if (current === undefined) {
    console.warn("solved!");
    return set;
  }

  const clone = [...set];
  for (const i of possibleNumber[current]) {
    if (!check(clone, i, current)) {
      continue;
    }
    clone[current] = i;
    const res = bruteForce(clone, next, possibleNumber);
    if (res) {
      return res;
    }
  }
  return false;
};

const check = (set: S, num: number, pos: number) => {
  const row = Math.floor(pos / 9);
  const col = pos % 9;

  for (let i = 0; i < 9; i++) {
    if (set[i * 9 + col] === num || set[row * 9 + i] === num) {
      return false;
    }
  }

  // check block
  const brow = Math.floor(row / 3);
  const bcol = Math.floor(col / 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (set[(brow * 3 + j) * 9 + bcol * 3 + i] === num) {
        return false;
      }
    }
  }

  return true;
};

const getPossibleNumbers = (set: S) => {
  const res: number[][] = [];
  for (let i = 0; i < set.length; i++) {
    const b = [];
    for (let j = 1; j <= 9; j++) {
      if (check(set, j, i)) {
        b.push(j);
      }
    }
    if (b.length === 0) {
      b.push(set[i]);
    }
    res.push(b);
  }

  return res;
};
