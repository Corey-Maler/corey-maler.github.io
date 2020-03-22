import * as PIXI from "pixi.js";
import { buildGrid, renderNumber } from "./ui";
import { H, W } from "./consts";

const app = new PIXI.Application({
  backgroundColor: 0xffffff,
  width: W,
  height: H,
  resolution: window.devicePixelRatio || 1
});
document.getElementById("container").appendChild(app.view);

const grid = buildGrid();

app.stage.addChild(grid);

const n = renderNumber(5, 3);

app.stage.addChild(n);
