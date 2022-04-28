const c = document.querySelector("canvas");
const ctx = c.getContext("2d");
const rd = Math.random;
const p = Math.PI;
const pow = Math.pow;
let that;
// 存储小球的数组
var ballArr = [];
// 画布尺寸
c.width = document.documentElement.clientWidth - 20;
c.height = document.documentElement.clientHeight - 20;
function Ball() {
    // 小球初始坐标
    this.x = parseInt(rd() * c.width)
    this.y = parseInt(rd() * c.height)
    // 小球半径
    this.r = 10;
    // 小球颜色
    // this.color = "#555";
    this.color = getColor();
    // 设置小球移动的方向
    this.dx = parseInt(rd() * 10) - 5;
    this.dy = parseInt(rd() * 10) - 5;
    // 让小球不在边上
    if (this.x < this.r || (c.width - this.x) < this.r) this.x = parseInt(rd() * c.width);
    if (this.y < this.r || (c.height - this.y) < this.r) this.y = parseInt(rd() * c.width);
    // 将生成的小球存入数组
    ballArr.push(this);
    // 记录小球在数组中的序列号
    this.index = ballArr.length - 1
}
// 渲染小球
Ball.prototype.render = function () {
    that = this
    ctx.beginPath();
    // 透明度
    ctx.globalAlpha = 1;
    // 画小球
    ctx.arc(this.x, this.y, this.r, 0, 2 * p, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    // 小球连线
    for (let i = this.index; i < ballArr.length; i++) {
        if (Math.abs(ballArr[i].x - that.x) < 150 && Math.abs(ballArr[i].y - that.y) < 150) {
            ctx.strokeStyle = getColor();
            ctx.beginPath();
            // 根据连线小球的距离，修改线的透明度
            ctx.globalAlpha = 50 / Math.sqrt(pow(ballArr[i].x - this.x, 2) + pow(ballArr[i].y - this.y, 2))
            ctx.moveTo(that.x, that.y);
            ctx.lineTo(ballArr[i].x, ballArr[i].y);
            ctx.closePath();
            ctx.stroke();
        }
    }
    // ballArr.forEach(e => {
    //     for (let i = 0; i < 3; i++) {
    //         let b = ballArr[parseInt(rd() * ballArr.length)];
    //         ctx.strokeStyle = getColor();
    //         ctx.beginPath();
    //         ctx.moveTo(b.x,b.y);
    //         ctx.lineTo(e.x, e.y);
    //         ctx.closePath();
    //         ctx.stroke();
    //     }
    // })
}
// 小球更新
Ball.prototype.update = function () {
    this.x += this.dx;
    this.y += this.dy;
}
// 小球反弹
Ball.prototype.bounce = function () {
    if (this.x < this.r || (c.width - this.x) < this.r) this.dx = -this.dx
    if (this.y < this.r || (c.height - this.y) < this.r) this.dy = -this.dy;
}
// 创建小球
for (let i = 0; i < 20; i++) {
    new Ball();
}
// 小球动画--定时器
setInterval(() => {
    // 清除画布
    ctx.clearRect(0, 0, c.width, c.height);
    ballArr.forEach(e => {
        e.render();
        e.update();
        e.bounce();
    });
}, 20);
// 获得随机颜色
function getColor() {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += arr[parseInt(rd() * arr.length)]
    }
    return color;
}