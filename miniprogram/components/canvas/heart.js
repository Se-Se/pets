
var tween = {

    x: Math.random() * innerWidth,
    y: Math.random() * innerWidth

}, target;

/*
 * List colors.
 */

var colors = [

    '#0f628b',
    '#ccdff0',
    '#66ebff',
    '#ffffff',
    '#f0ff00'

];

var canvas;
var context;
var audioContext;
var buffer;
var particles = [];
var tweets;
var mouse = { x: -99999, y: -99999 };
var line = [{ x: 0, y: 0 }];
var type = ['circle', 'rumble'];
var nextTweet = 0;
var isLoading = true;
var explosion = true
var input = false;
var release = false;
var played = false;
let id = null;
let HEARTLOADING = {

    init: function (_this) {
        particles=[];
        return new Promise((reslove) => {
            const query = wx.createSelectorQuery().in(_this);
            query.select('#the_canvas').fields({ node: true, size: true }).exec((res) => {

                canvas = res[0].node;
                this.canvas = canvas;
                // canvas._canvasRef.style.background = '-webkit-radial-gradient(#17cbcb, #018181)';
                // canvas._canvasRef.style.background = '-moz-radial-gradient(#17cbcb, #018181)';
                // canvas._canvasRef.style.background = '-ms-radial-gradient(#17cbcb, #018181)';
                // canvas._canvasRef.style.background = '-o-radial-gradient(#17cbcb, #018181)';
                // canvas._canvasRef.style.background = 'radial-gradient(#17cbcb, #018181)';
                // canvas._canvasRef.style.position = 'absolute';
                // canvas._canvasRef.style.top = 0;
                // canvas._canvasRef.style.bottom = 0;
                // canvas._canvasRef.style.left = 0;
                // canvas._canvasRef.style.right = 0;
                // canvas._canvasRef.style.zIndex = -1;


                // canvas._canvasRef.style.background = 'rgb(192, 224, 238)';
                // canvas._canvasRef.style.background = '#198a8a';


                context = canvas.getContext('2d');
                const dpr = wx.getSystemInfoSync().pixelRatio;
                canvas.width = res[0].width * dpr * 0.5;
                canvas.height = res[0].height * dpr * 0.5;

                createParticles(canvas);

            })
        })
    },
    canvasInit: function () {
        particles=[]
    }
}
function loop(_canvas) {
    clear();
    update();
    render();
    id = _canvas.requestAnimationFrame(() => {
        _canvas.cancelAnimationFrame(id);
        loop(_canvas);
    });

}
function clear(alpha) {

    context.clearRect(0, 0, canvas.width, canvas.height);

}
/*
 * Update the particles.
 */

function update() {

    var particle = particles[target];

    if (explosion) {

        while (line.length < 20) {

            line.push({ x: tween.x, y: tween.y });

        }

        line.shift();

        if (input || release) {

            tween.x += (particle.x - tween.x) * 0.1;
            tween.y += (particle.y - tween.y) * 0.1;

        }

        if (distanceTo(tween, particle) < 5) {

            if (!played) {

                try {

                    play();

                }

                catch (Exception) { }

                // loadTweet(particle.color);

                played = true;

            }

            particle.radius += (particle.towardsRadius - particle.radius) * 0.2;

            if (Math.round(particle.radius) === Math.round(particle.towardsRadius))

                // Enable input
                explosion = input = false;

        }

    }

    particles.forEach(function (particle, index) {

        var ease = 0.01, friction = 0.93;

        // Velocity
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rotation
        particle.x = particle.centerX + Math.cos(index + particle.angle) * particle.orbit;
        particle.y = particle.centerY + Math.sin(index + particle.angle) * particle.orbit;

        particle.angle += particle.speed;

        // Ease
        particle.vx += ((innerWidth || canvas.width) * 0.5 + 180 * Math.pow(Math.sin(index), 3) - particle.centerX) * ease;
        particle.vy += (250 + 10 * (- (15 * Math.cos(index) - 5 * Math.cos(2 * index) - 2 * Math.cos(3 * index) - Math.cos(4 * index))) - particle.centerY) * ease;

        // Friction
        particle.vx *= friction;
        particle.vy *= friction;

        particle.centerX += particle.vx;
        particle.centerY += particle.vy;

    });

}
function render() {

    context.save();
    context.beginPath();

    [].forEach.call(line, function (point, index) {

        var currentPoint = line[index];
        var nextPoint = line[index + 1];

        if (index === 0)

            context.moveTo(currentPoint.x + (nextPoint.x - currentPoint.x) * 0.5, currentPoint.y + (nextPoint.y - currentPoint.y) * 0.5);

        else if (nextPoint)

            context.quadraticCurveTo(currentPoint.x, currentPoint.y, currentPoint.x + (nextPoint.x - currentPoint.x) * 0.5, currentPoint.y + (nextPoint.y - currentPoint.y) * 0.5);

    });

    context.lineWidth = 0.1;
    context.shadowColor = '#ffffff';
    context.shadowBlur = 1;
    context.strokeStyle = '#ffffff';
    context.stroke();
    context.restore();

    [].forEach.call(particles, function (particle, index) {

        if (index !== target) {

            context.save();
            context.globalCompositeOperation = 'lighter';
            context.globalAlpha = 1.0;
            context.translate(particle.x, particle.y);
            context.rotate(45 * Math.PI / 180);
            context.fillStyle = particle.color;
            context.beginPath();
            particle.type === 'circle' ? context.arc(-2, -2, particle.radius, 0, Math.PI * 2) : context.rect(particle.radius / -2, particle.radius / -2, particle.radius, particle.radius);
            context.closePath();
            context.fill();
            context.restore();

        }

    });

    [].forEach.call(particles, function (particle, index) {

        // Render the target particle on top of stack
        if (index === target) {

            context.save();
            context.globalAlpha = 1.0;
            context.translate(particle.x, particle.y);
            context.rotate(45 * Math.PI / 180);
            context.fillStyle = particle.color;
            context.beginPath();
            particle.type === 'circle' ? context.arc(-2, -2, particle.radius, 0, Math.PI * 2) : context.rect(particle.radius / -2, particle.radius / -2, particle.radius, particle.radius);
            context.closePath();
            context.fill();
            context.restore();

        }

    });

}
function createParticles(_canvas) {

    for (var particle = 0, len = 100; particle < len; particle++) {

        var x, y, shape, radius;

        x = canvas.width * 0.5;
        y = canvas.height * 0.5;

        shape = type[~~(Math.random() * type.length)];
        radius = shape === 'circle' ? randomBetween(1, 6) : randomBetween(1, 6) * 2;

        particles.push({

            x: x,
            y: y,
            goalX: x,
            goalY: y,
            centerX: (innerWidth || canvas.width) * 0.5 + 180 * Math.pow(Math.sin(particle), 3),
            centerY: 250 + 10 * (- (15 * Math.cos(particle) - 5 * Math.cos(2 * particle) - 2 * Math.cos(3 * particle) - Math.cos(4 * particle))),

            vx: 0,
            vy: 0,

            radius: radius,
            copyRadius: radius,
            towardsRadius: shape === 'circle' ? 80 : 140,
            color: colors[~~(Math.random() * colors.length)],
            alpha: 0.0,

            orbit: 5,
            speed: 0.06 + Math.random() * 0.08,
            angle: 0,

            type: shape

        });

    }

    target = randomBetween(0, particles.length - 1);

    loop(_canvas);

}
function randomBetween(min, max) {

    return ~~(Math.random() * (max - min + 1) + min);

}
/*
 * Distance between two points.
 */

function distanceTo(pointA, pointB) {

    var dx = Math.abs(pointA.x - pointB.x);
    var dy = Math.abs(pointA.y - pointB.y);

    return Math.sqrt(dx * dx + dy * dy);

}
module.exports = {
    HEARTLOADING
}