var lastFrameTime = 0;
var doAnimationFrame = function (callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastFrameTime));
    var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
    lastFrameTime = currTime + timeToCall;
    return id;
};
var abortAnimationFrame = function (id) {
    clearTimeout(id);
};


// WRITTEN BY TRUMAN HEBERLE
var COLOR = "#52E6FF"

var FONT_SIZE = 50;
var AMOUNT = 1000;
var SIZE = 1;
var INITIAL_DISPLACEMENT = 100;
var INITIAL_VELOCITY = 5;
var VELOCITY_RETENTION = 0.95;
var SETTLE_SPEED = 1;
var FLEE_SPEED = 1;
var FLEE_DISTANCE = 100;
// var FLEE = false;
var SCATTER_VELOCITY = 2;
// var SCATTER = true;
// Mobile




let Text = {
    clear: abortAnimationFrame,
    canvas: null,
    ctx: null,
    MESSAGE : '17sucai',
    MOUSE :{
        x: 0,
        y: 0
    },
    canvasInit: function () {
        return new Promise((reslove) => {
            const query = wx.createSelectorQuery();
            query.select('#canvas_test').fields({ node: true, size: true }).exec((res) => {
                console.log(res)
                const canvas = res[0].node;
                this.canvas = canvas;
                console.log(this.canvas.width,this.canvas.height)
                this.ctx = canvas.getContext('2d');
                const dpr = wx.getSystemInfoSync().pixelRatio;
                console.log(dpr)
                canvas.width = res[0].width ;
                canvas.height = res[0].height ;

                adjustText();
                doAnimationFrame(animate);
                
                reslove(POINTS)
            
            })
        })

    },
    animationFrame: function (can) {
        let id = can.requestAnimationFrame(() => {
            animate()
            can.cancelAnimationFrame(id);
            this.animationFrame(can);
        });
    },
}

var POINTS = [];


function Point(x, y, r, g, b, a) {
    var angle = Math.random() * 6.28;
    this.dest_x = x;
    this.dest_y = y;
    this.original_r = r;
    this.original_g = g;
    this.original_a = a;
    this.x = Text.canvas.width / 2 - x + (Math.random() - 0.5) * INITIAL_DISPLACEMENT;
    this.y = Text.canvas.height / 2 - y + (Math.random() - 0.5) * INITIAL_DISPLACEMENT;
    this.velx = INITIAL_VELOCITY * Math.cos(angle);
    this.vely = INITIAL_VELOCITY * Math.sin(angle);
    this.target_x = Text.canvas.width / 2 - x;
    this.target_y = Text.canvas.height / 2 - y;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;

    this.getX = function () {
        return this.x;
    }

    this.getY = function () {
        return this.y;
    }

    this.resetTarget = function () {
        this.target_x = Text.canvas.width / 2 - this.dest_x;
        this.target_y = Text.canvas.height / 2 - this.dest_y;
    }

    this.fleeFrom = function (x, y) {

        this.velx -= ((Text.MOUSE.x - this.x) * FLEE_SPEED / 10);
        this.vely -= ((Text.MOUSE.y - this.y) * FLEE_SPEED / 10);
    }

    this.settleTo = function (x, y) {

        this.velx += ((this.target_x - this.x) * SETTLE_SPEED / 100);
        this.vely += ((this.target_y - this.y) * SETTLE_SPEED / 100);
        this.velx -= this.velx * (1 - VELOCITY_RETENTION);
        this.vely -= this.vely * (1 - VELOCITY_RETENTION);
    }

    this.scatter = function () {
      
        var unit = this.unitVecToMouse();
        var vel = SCATTER_VELOCITY * 10 * (0.5 + Math.random() / 2);
        this.velx = -unit.x * vel;
        this.vely = -unit.y * vel;
    }

    this.move = function () {
        if (this.distanceToMouse() <= FLEE_DISTANCE) {
            this.fleeFrom(Text.MOUSE.x, Text.MOUSE.y);
        }
        else {
            this.settleTo(this.target_x, this.target_y);
        }

        if (this.x + this.velx < 0 || this.x + this.velx >= Text.canvas.width) {
            this.velx *= -1;
        }
        if (this.y + this.vely < 0 || this.y + this.vely >= Text.canvas.height) {
            this.vely *= -1;
        }

        this.x += this.velx;
        this.y += this.vely;
    }

    this.distanceToTarget = function () {
        return this.distanceTo(this.target_x, this.target_y);
    }

    this.distanceToMouse = function () {
        return this.distanceTo(Text.MOUSE.x, Text.MOUSE.y);
    }

    this.distanceTo = function (x, y) {
        // console.log('this.x',Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y)))
        return Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y));
    }

    this.unitVecToTarget = function () {
        return this.unitVecTo(this.target_x, this.target_y);
    }

    this.unitVecToMouse = function () {
        return this.unitVecTo(Text.MOUSE.x, Text.MOUSE.y);
    }

    this.unitVecTo = function (x, y) {
        var dx = x - this.x;
        var dy = y - this.y;
        return {
            x: dx / Math.sqrt(dx * dx + dy * dy),
            y: dy / Math.sqrt(dx * dx + dy * dy)
        };
    }
}



function adjustText() {
    Text.ctx.fillStyle = COLOR;
    Text.ctx.textBaseline = "middle";
    Text.ctx.textAlign = "center";
    Text.ctx.font = FONT_SIZE + "px Arial";
    Text.ctx.fillText(Text.MESSAGE, Text.canvas.width / 2, Text.canvas.height / 2);
    var textWidth = Text.ctx.measureText(Text.MESSAGE).width;
    if (textWidth == 0) {
        return;
    }
    var minX = Text.canvas.width / 2 - textWidth / 2;
    var minY = Text.canvas.height / 2 - FONT_SIZE / 2;
    var data = Text.ctx.getImageData(minX, minY, textWidth, FONT_SIZE).data;
    var isBlank = true;
    for (var i = 0; i < data.length; i++) {
        if (data[i] != 0) {
            isBlank = false;
            break;
        }
    }

    if (!isBlank) {
        var count = 0;
        var curr = 0;
        var num = 0;
        var x = 0;
        var y = 0;
        var w = Math.floor(textWidth);
        POINTS = [];
        while (count < AMOUNT) {
            while (curr == 0) {
                num = Math.floor(Math.random() * data.length);
                curr = data[num];
            }
            num = Math.floor(num / 4);
            x = w / 2 - num % w;
            y = FONT_SIZE / 2 - Math.floor(num / w);
            POINTS.push(new Point(x, y, data[num * 4], data[num * 4 + 1], data[num * 4 + 2], data[num * 4 + 3]));
            curr = 0;
            count++;
        }
    }
}


function animate() { 
    update();
    draw();
}

function update() {
    var point;
    for (var i = 0; i < POINTS.length; i++) {
        point = POINTS[i];
        point.move();
    }
}

function draw() {

    Text.ctx.clearRect(0, 0, Text.canvas.width, Text.canvas.height);

    var point=null;
    for (var i = 0; i < POINTS.length; i++) {
        point = POINTS[i];
        Text.ctx.fillStyle = "rgba(" + point.r + "," + point.g + "," + point.b + "," + point.a + ")";
        Text.ctx.beginPath();
        Text.ctx.arc(point.getX(), point.getY(), SIZE, 0, 2 * Math.PI);
        Text.ctx.fill();
    }


    doAnimationFrame(animate)

}

module.exports = {
    CANVASTEXT: Text,

}
