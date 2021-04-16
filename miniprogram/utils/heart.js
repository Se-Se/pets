/*
* File Name / blowingHeart.js
* Created Date / Aug 24, 2020
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

class Tool {
  // random number.
  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // random color rgb.
  static randomColorRGB() {
    return (
      "rgb(" +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ")"
    );
  }
  // random color hsl.
  static randomColorHSL(hue, saturation, lightness) {
    return (
      "hsl(" +
      hue +
      ", " +
      saturation +
      "%, " +
      lightness +
      "%)"
    );
  }
  // gradient color.
  static gradientColor(ctx, cr, cg, cb, ca, x, y, r) {
    const col = cr + "," + cg + "," + cb;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(" + col + ", " + (ca * 1) + ")");
    g.addColorStop(0.5, "rgba(" + col + ", " + (ca * 0.5) + ")");
    g.addColorStop(1, "rgba(" + col + ", " + (ca * 0) + ")");
    return g;
  }
}

/*
  When want to use Angle and radian.
*/

class Angle {
  constructor(a) {
    this.a = a;
    this.rad = (this.a * Math.PI) / 180;
  }

  incDec(num) {
    this.a += num;
    this.rad = (this.a * Math.PI) / 180;
  }
}

/*
  variable for canvas.
*/
  // 模拟 requestAnimationFrame
var lastFrameTime = 0;
var doAnimationFrame = function (callback) {
  var currTime = new Date().getTime();
  var timeToCall = Math.max(0, 16 - (currTime - lastFrameTime));
  var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
  lastFrameTime = currTime + timeToCall;
  return id;
};
var abortAnimationFrame = function(id) {
  clearTimeout(id);
};
let HEART = {
  clear: abortAnimationFrame,
  canvas: null,
  offCanvas: null,
  offHeartNum: 1,
  offHearts: [],
  hearts: [],
  mouseX: null,
  mouseY: null,
  data: null,
  canvasFun: function () {
      const query = wx.createSelectorQuery();
      query.select('#canvas_heart').fields({ node: true, size: true }).exec((res) => {
          console.log(res)
          const canvas = res[0].node;
          this.canvas = canvas;
          this.context = canvas.getContext('2d');
          const dpr = wx.getSystemInfoSync().pixelRatio;
          canvas.width = res[0].width * dpr;
          canvas.height = res[0].height * dpr;
          this.ctx = canvas.getContext("2d");
          this.width = canvas.width;
          this.height = canvas.height;
          // size.
          this.width < 768 ? this.heartSize = 180 : this.heartSize = 250;
          this.mouseY = null;
          // sprite array and quantity.
          this.hearts = [];
          this.offHeartNum = 1;
          this.offHearts = [];
          // offscreen data.
          this.data = null;
          
          // this.render();
          this.animationFrame(this.canvas);
          this.offInit();
        })
  },
animationFrame:function(can){
 let id =  can.requestAnimationFrame(()=>{
    this.render();
    can.cancelAnimationFrame(id);
    this.animationFrame(can);
  });
},
  onInit: function () {
    let index = 0;
    for (let i = 0; i < this.height; i += 12) {
      for (let j = 0; j < this.width; j += 12) {
        let oI = (j + i * this.width) * 4 + 3;
        if (this.data[oI] > 0) {
          index++;
          const h = new Heart(this.ctx, j + Tool.randomNumber(-3, 3), i + Tool.randomNumber(-3, 3), Tool.randomNumber(6, 12), index);
          this.hearts.push(h);
        }
      }
    }
  },

  offInit: function () {
    for (let i = 0; i < this.offHeartNum; i++) {
      const s = new Heart(this.ctx, this.width / 2, this.height / 2.3, this.heartSize);
      this.offHearts.push(s);
    }
    for (let i = 0; i < this.offHearts.length; i++) {
      this.offHearts[i].offRender(i);
    }
    // data
    this.data = this.ctx.getImageData(0, 0, this.width, this.height).data;
    // on screen init.
    this.onInit();
  },

  render: function () {
    // doAnimationFrame(HEART.render);
    HEART.context.clearRect(0, 0, HEART.width, HEART.height);
    for (let i = 0; i < HEART.hearts.length; i++) {
      HEART.hearts[i].render(i);
    }
  },

  resize: function () {
    this.offHearts = [];
    this.hearts = [];
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.width < 768 ? this.heartSize = 180 : this.heartSize = 250;
  },
}
class Heart {
  constructor(ctx, x, y, r, i) {
    this.ctx = ctx;
    this.init(x, y, r, i);
  }
  init = (x, y, r, i) => {
    this.x = x;
    this.xi = x;
    this.y = y;
    this.yi = y;
    this.r = r;
    this.i = i * 0.5 + 200;
    this.l = this.i;
    this.c = Tool.randomColorHSL(Tool.randomNumber(-5, 5), 80, 60);
    this.a = new Angle(Tool.randomNumber(0, 360));
    this.v = {
      x: Math.random(),
      y: -Math.random()
    };
    this.ga = Math.random();
  }
  draw = () => {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = this.ga;
    ctx.beginPath();
    ctx.fillStyle = this.c;
    ctx.moveTo(this.x, this.y + this.r);
    ctx.bezierCurveTo(
      this.x - this.r - this.r / 5,
      this.y + this.r / 1.5,
      this.x - this.r,
      this.y - this.r,
      this.x,
      this.y - this.r / 5
    );
    ctx.bezierCurveTo(
      this.x + this.r,
      this.y - this.r,
      this.x + this.r + this.r / 5,
      this.y + this.r / 1.5,
      this.x,
      this.y + this.r
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  updateParams() {
    this.a.incDec(1);
    Math.sin(this.a.rad) < 0 ? this.r = -Math.sin(this.a.rad) * 20 : this.r = Math.sin(this.a.rad) * 20;
  }
  updatePosition() {
    this.l -= 1;
    if (this.l < 0) {
      this.v.y -= 0.01;
      this.v.x += 0.02;
      this.y += this.v.y;
      this.x += this.v.x;
    }
  }
  wrapPosition() {
    if (this.x > HEART.canvas.width * 1.5) {
      this.init(this.xi, this.yi, Tool.randomNumber(6, 12), this.i);
    }
  }
  render() {
    this.wrapPosition();
    this.updateParams();
    this.updatePosition();
    this.draw();
  }
  offRender(i) {
    this.draw();
  }
}

module.exports={
  HEART:HEART
}

