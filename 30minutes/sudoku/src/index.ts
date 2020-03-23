import * as PIXI from "pixi.js";
import { buildGrid, renderNumber, renderSet } from "./ui";
import { H, W, S } from "./consts";
import {
  rst1,
  rst2,
  antiBruteForce,
  antiBruteForceSimplified,
  antiBruteForceSimplified2,
  rst1S,
  rst2S
} from "./mocks";
import { solve } from "./solver";

const app = new PIXI.Application({
  backgroundColor: 0xffffff,
  width: W,
  height: H,
  resolution: window.devicePixelRatio || 1
});
document.getElementById("container").appendChild(app.view);

const grid = buildGrid();

app.stage.addChild(grid);

const set = antiBruteForce.reduce((acc, el) => [...acc, ...el], []);
// const set = rst2.reduce((acc, el) => [...acc, ...el], []);
// const set = rst1.reduce((acc, el) => [...acc, ...el], []);
// const set = antiBruteForceSimplified.reduce((acc, el) => [...acc, ...el], []);

let lastS: PIXI.Container;

function render(set: S, original: S, possibleSolutions?: number[][]) {
  if (lastS) {
    app.stage.removeChild(lastS);
  }

  lastS = renderSet(set, original, possibleSolutions);
  app.stage.addChild(lastS);
}

render(set, set);

// solve(set, render);

const runButton = document.getElementById("run");
runButton.addEventListener("click", () => solve(set, render));
