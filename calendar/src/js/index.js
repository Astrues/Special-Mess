// 引入 css 文件
import '../css/index.css';
import '../css/ui.css';
// 引入js
import './ui';
// 保存this
let that;
let flag = true;
class Calendar {
    constructor() {
        that = this
        //  当前年份
        this.currentYear = 1970;
        //  当前月份 ，从0计算
        this.currenMonth = 0;
        // 几号
        this.currentDay = 1;
        // 本月星期一是星期几
        this.currentFirstWeekDay = 4;
        // 本月有多少天
        this.allDay = 31;
        // 上月有多少天
        this.prevDay = 31;
        // 操作月份
        this.left = document.querySelector(".left");
        this.right = document.querySelector(".right");
        // 操作年份
        this.b_left = document.querySelector(".b-left");
        this.b_right = document.querySelector(".b-right");
        // 操作Dom函数
        this.init(new Date())
        this.renderCallback();
    }
    init(date) {
        if (flag) {
            this.update(date);
        }
        // 获取当前月份首日是周几
        this.getFirstDay();
        // 获得上个月有多少天
        this.prevDay = this.getNowMonthDay(this.currentYear, this.currenMonth - 1);
        // 获得本月有多少天
        this.allDay = this.getNowMonthDay(this.currentYear, this.currenMonth);
        // 上一月
        this.left.onclick = this.prevMonth;
        // 下一月
        this.right.onclick = this.nextMonth;
        // 上一年
        this.b_left.onclick = this.prevYear;
        // 下一年
        this.b_right.onclick = this.nextYear;
    }
    // 更新数据
    update(date) {
        // 年
        this.currentYear = date.getFullYear();
        // 月
        this.currenMonth = date.getMonth() + 1;
        // 日
        this.currentDay = date.getDate();
        flag = false;
    }
    // 清除节点操作
    clearDom() {
        let temps = document.querySelector(".day").querySelectorAll(".temp")
        for (let i = 0; i < temps.length; i++) {
            temps[i].remove();
        }
    }
    // 操作DOM函数
    renderCallback() {
        let day = document.querySelector(".day");
        // 创建42个日期格子
        for (let i = 0; i < 6; i++) {
            let div = document.createElement("div");
            let ul = document.createElement("ul");
            for (let j = 0; j < 7; j++) {
                let span = document.createElement("span")
                span.className = 'sun'
                let li = document.createElement("li");
                li.appendChild(span);
                ul.appendChild(li);
            }
            div.className = 'temp'
            div.appendChild(ul);
            day.appendChild(div);
        }
        let spans = document.querySelectorAll(".sun");
        let j = 0;
        for (let i = this.currentFirstWeekDay - 1; i >= 0; i--) {
            spans[i].className = 'moon'
            spans[i].innerHTML = this.prevDay - j;
            j++;
        }
        j = 0;
        for (let i = 0; i < this.allDay; i++) {
            j++;
            spans[this.currentFirstWeekDay + i].innerHTML = j;
        }
        j = 0;
        for (let i = this.allDay + this.currentFirstWeekDay; i < spans.length; i++) {
            j++;
            spans[i].className = 'will'
            spans[i].innerHTML = j;
        }
        // 如果是当前月份当前年份，就将今天突出显示
        if (this.currenMonth === new Date().getMonth() + 1 && this.currentYear === new Date().getFullYear()) {
            spans[this.currentFirstWeekDay + this.currentDay - 1].className = "now"
        }
        // 修改标题
        document.querySelector("h4").querySelectorAll("span")[1].innerHTML = `${this.currentYear}年${this.currenMonth}月`
    }
    // 某年某月第一天是周几
    getFirstDay() {
        this.currentFirstWeekDay = new Date(`${this.currentYear}/${this.currenMonth}/1`).getDay()
        return this.currentFirstWeekDay;
    }
    // 日历中某年某月需显示的天数的具体信息
    getNowMonthDay(year, month) {
        that.allDay = new Date(year, month, 0).getDate();
        return that.allDay;
    }
    // 上翻一月操作
    prevMonth() {
        if (that.currenMonth === 1) {
            that.currenMonth = 12;
            that.currentYear = that.currentYear - 1;
        }
        // console.log(that.currenMonth);
        that.currenMonth = that.currenMonth - 1;
        that.init();
        that.clearDom();
        that.renderCallback();
    }
    // 下翻一月操作
    nextMonth() {
        if (that.currenMonth === 12) {
            that.currenMonth = 1;
            that.currentYear = that.currentYear + 1;
        }
        // console.log(that.currenMonth);
        that.currenMonth = that.currenMonth + 1;
        that.init();
        that.clearDom();
        that.renderCallback();
    }
    // 上翻一年操作
    prevYear() {
        that.currentYear = that.currentYear - 1;
        that.init();
        that.clearDom();
        that.renderCallback();
    }
    // 下翻一年操作
    nextYear() {
        that.currentYear = that.currentYear + 1;
        that.init();
        that.clearDom();
        that.renderCallback();
    }
}
const calendar = new Calendar();