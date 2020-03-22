import * as PIXI from "pixi.js";
import {
  H,
  BORDER_WIDTH,
  BORDER_COLOR,
  STEP,
  W,
  BORDER_COLOR_DARK,
  S
} from "./consts";

export const getLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  dark = false
) => {
  const line = new PIXI.Graphics().lineStyle(
    BORDER_WIDTH,
    dark ? BORDER_COLOR_DARK : BORDER_COLOR
  );
  line.moveTo(x1, y1);
  line.lineTo(x2, y2);
  line.endFill();
  return line;
};

export const buildGrid = () => {
  const grid = new PIXI.Container();

  for (let i = 1; i < 9; i++) {
    grid.addChild(getLine(i * STEP, 0, i * STEP, H, i % 3 === 0));
    grid.addChild(getLine(0, i * STEP, W, i * STEP, i % 3 === 0));
  }

  return grid;
};

const textStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fontWeight: "bold",
  fill: "#666666"
});

const textSmallStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 12,
  fill: "#999999"
});

const textStyleOriginal = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fontWeight: "bold",
  fill: "#29a5cc"
});

export const renderNumber = (num: number, ind: number, original = false) => {
  const row = Math.floor(ind / 9);
  const col = ind % 9;

  const text = new PIXI.Text(
    num.toFixed(0),
    original ? textStyleOriginal : textStyle
  );
  text.x = col * STEP + 18;
  text.y = row * STEP + 8;
  return text;
};

const smallOffset = [
  [5, 5],
  [25, 5],
  [40, 5],
  [5, 25],
  [25, 25],
  [40, 25],
  [5, 40],
  [25, 40],
  [40, 40]
];

export const renderSmallNumber = (num: number, ind: number) => {
  const row = Math.floor(ind / 9);
  const col = ind % 9;

  const text = new PIXI.Text(num.toFixed(0), textSmallStyle);
  const offset = smallOffset[num - 1];
  text.x = col * STEP + offset[0];
  text.y = row * STEP + offset[1];
  return text;
};

export const renderSet = (
  nums: number[],
  original: S,
  possible?: number[][]
) => {
  const set = new PIXI.Container();
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
    } else {
      set.addChild(renderNumber(nums[i], i, original[i] === nums[i]));
    }
  }

  if (possible) {
    for (let i = 0; i < possible.length; i++) {
      const p = possible[i];
      for (const j of p) {
        set.addChild(renderSmallNumber(j, i));
      }
    }
  }
  return set;
};
