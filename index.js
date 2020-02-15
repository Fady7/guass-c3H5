var mycanvas = document.getElementById("mycanvas");
var ctx = mycanvas.getContext("2d");

function init() {
    mycanvas.width = window.innerWidth;
    mycanvas.height = window.innerHeight;
}
init();
window.onresize = init;
var circleArr = [];

mycanvas.addEventListener("mousemove", function (e) {
    var obj = new Circle(e.clientX, e.clientY);
    circleArr.push(obj);
})

function Circle(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 4 * (Math.random() - 0.5);
    this.vy = 4 * (Math.random() - 0.5);
    this.a = 1; //透明度
    this.color = "rgb(" + Math.random() * 255 + "," + Math.random() * 255 + "," + Math.random() * 255 + ")";
    this.draw();
}
Circle.prototype = {
    draw: function () {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, 30, 0, 2 * Math.PI, 0);
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = this.a;
        ctx.fill();
        this.move();
    },
    move: function () {
        this.x += this.vx;
        this.y += this.vy;
        this.a *= 0.98;
    }
}

function render() {
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    circleArr.forEach(function (ele, index) {
        ele.draw();
        if (ele.a < 0.03) {
            circleArr.splice(index, 1);
        }
    });
    setTimeout(function () {
        render();
    }, 20)
}
render();