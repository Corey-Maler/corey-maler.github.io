let W = 500;
let H = W;

class Box {
  constructor([x1, y1], [x2, y2]) {
    this.x1 = x1;
    this.y1 = y1;

    this.x2 = x2;
    this.y2 = y2;

    this.defaults = [x1, y1, x2, y2];
  }

  get width() {
    return this.x2 - this.x1;
  }

  get height() {
    return this.y2 - this.y1;
  }

  fromGlobalX(x) {
    return (x / W) * this.width + this.x1;
  }

  fromGlobalY(y) {
    return (y / H) * this.height + this.y1;
  }

  reset() {
    this.x1 = this.defaults[0];
    this.y1 = this.defaults[1];

    this.x2 = this.defaults[2];
    this.y2 = this.defaults[3];
  }

  zoomToThird(x, y) {
    if (x >= 3 || y >= 3) {
      throw new Error('x and y must be less than 3');
    }
    const w = this.x2 - this.x1;
    const w3 = w / 3;
    const h = this.y2 - this.y1;
    const h3 = h / 3;
    this.x1 = this.x1 + w3 * x;
    this.y1 = this.y1 + h3 * y;

    this.x2 = this.x1 + w3;
    this.y2 = this.y1 + h3;
  }
}

const box = new Box([-2, -1.5], [1, 1.5]);

function reset() {
  box.reset();
  update();
}

class Selectable {
  constructor(el, canv, onUpdate) {
    this.originalElement = el;
    this.canvas = canv;
    el.innerHTML = '';

    // I know that this is least to say lazy approach
    // but well, good for demo
    for (const y of [0, 1, 2]) {
      for (const x of [0, 1, 2]) {
        const el = document.createElement('div');
        el.classList.add('cell');
        this.originalElement.appendChild(el);
        const callback = () => {
          console.log('TOUCED');
          box.zoomToThird(x, y);
          //   update();
          this.animCanvas(x, y);
        };

        el.addEventListener('click', callback);
        el.addEventListener('touched', callback);
      }
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // W = entry.contentRect.width;
        canv.fixCanvasSize();
        update();
      }
    });

    resizeObserver.observe(el);
  }

  animCanvas(x, y) {
    const cnv = this.canvas.canvas;

    cnv.classList.add('anim');
    cnv.style.transform = `scale(3) translate(${(-x * 100) / 3}%, ${
      (-y * 100) / 3
    }%) `;
    cnv.addEventListener(
      'transitionend',
      () => {
        cnv.classList.remove('anim');
        cnv.style.transform = '';
        update();
      },
      { once: true }
    );
  }
}

const pal = [];
for (let i = 0; i < 255; i++) {
  pal[i] = [
    Math.round(127 + 127 * Math.sin((2 * Math.PI * (i + 227)) / 255)),
    Math.round(127 + 127 * Math.sin((2 * Math.PI * (i + 227)) / 255)),
    Math.round(127 + 127 * Math.sin((2 * Math.PI * (i + 227)) / 255)),
  ];
}

pal[255] = [255, 255, 255];

class Canv {
  constructor() {
    this.canvas = document.getElementById('canvas');

    this.ctx = canvas.getContext('2d');

    this.fixCanvasSize();
  }

  fixCanvasSize() {
    const parent = this.canvas.parentElement;
    const parentWidth = parent.clientWidth;
    this.canvas.width = parentWidth;
    this.canvas.height = parentWidth;
    W = parentWidth;
    H = parentWidth;
  }

  init() {
    this.ctx.clearRect(0, 0, W, H);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, W, H);
    this.imgData = this.ctx.getImageData(0, 0, W, H);
    this.data = this.imgData.data;
  }

  setPixel(x, y, r, g, b, a) {
    const data = this.data;
    const offset = (x + y * W) * 4;
    data[offset + 0] = r;
    data[offset + 1] = g;
    data[offset + 2] = b;
    data[offset + 3] = a;
  }

  setPix(x, y, ind) {
    this.setPixel(x, y, pal[ind][0], pal[ind][1], pal[ind][2], 255);
  }

  finish() {
    this.ctx.putImageData(this.imgData, 0, 0);
  }
}

const canv = new Canv();

// z(n+1) = z(n)^2 + c
// if it limits to infinity -- black
// if it limits to finit number -- white

function calculate() {
  for (let i = 0; i < W; i++) {
    for (let j = 0; j < H; j++) {
      let t = 0;
      let za0 = 0;
      let zb0 = 0;
      const xa = box.fromGlobalX(i);
      const xb = box.fromGlobalY(j);
      for (t = 0; t < 1000; t++) {
        const aa = za0 * za0;
        const bb = zb0 * zb0;
        const za1t = aa - bb;
        const zb1t = za0 * zb0 + za0 * zb0;

        const za1 = za1t + xa;
        const zb1 = zb1t + xb;

        // @NB if |Zn|^2 > 4 it's definitely not a point in set
        if (aa + bb > 10000) {
          // return t % 255;
          break;
        }

        za0 = za1;
        zb0 = zb1;
      }

      // @NB this cause like 1ms increase time
      canv.setPix(i, j, t % 255);
    }
  }
}

function update() {
  canv.init();
  var t0 = performance.now();
  calculate();
  var t1 = performance.now();
  canv.finish();
  console.log('perf:', t1 - t0);
}

update();

const grid = document.getElementById('grid');
const s = new Selectable(grid, canv, calculate);
