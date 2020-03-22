import * as PIXI from "pixi.js";
import { H, BORDER_WIDTH, BORDER_COLOR, STEP, W, BORDER_COLOR_DARK } from "./consts";

export const getLine = (x1: number, y1: number, x2: number, y2: number, dark = false) => {
  const line = new PIXI.Graphics().lineStyle(BORDER_WIDTH, dark ? BORDER_COLOR_DARK : BORDER_COLOR);
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
    fill: "#666666",
  });

export const renderNumber = (num: number, ind: number) => {
    const row = Math.floor(ind / 9);
    const col = ind % 9;

    const text =  new PIXI.Text(num.toFixed(0), textStyle);
    text.x = col * STEP + 18;
    text.y = row * STEP + 5;
    return text;
}
