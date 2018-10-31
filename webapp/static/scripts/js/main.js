"use strict";
var months = [];
var week = [];
var date,week,month,year,day;
var App = React.createClass({
    displayName: "App",
    getInitialState: function getInitialState() {
        return {
            time: "00:00:00",
            amPm: "am",
            date: "Thursday 1 January 1970"
        };
    },
    componentDidMount: function componentDidMount() {
        this.loadInterval = setInterval(this.getTime, 1000);
    },
    getTime: function getTime() {
        var _this = this;

        var takeTwelve = function takeTwelve(n) {
            return n > 12 ? n - 12 : n;
        },
            addZero = function addZero(n) {
                return n < 10 ? "0" + n : n;
            },
            months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        setInterval(function () {
            var d = void 0,
                h = void 0,
                m = void 0,
                s = void 0,
                t = void 0,
                amPm = void 0;

            d = new Date();
            h = addZero(takeTwelve(d.getHours()));
            m = addZero(d.getMinutes());
            s = addZero(d.getSeconds());
            t = h + ":" + m + ":" + s;

            amPm = d.getHours() >= 12 ? "pm" : "am";
            week = weekday[d.getDay()];
            day = d.getDate();
            month = months[d.getMonth()];
            year = d.getFullYear();
            date = week + ", " + day + " " + month + " " + year;

            _this.setState({
                time: t,
                amPm: amPm,
                date: date
            });
        }, 1000);
    },
    render: function render() {
        return React.createElement(
            "div",
            { className: "container" },
            React.createElement(
                "span",
                {
                    className: this.state.time === "00:00:00" ? "time blink" : "time"
                },
                " ",
                this.state.time
            ),
            React.createElement(
                "span",
                { className: "amPm" },
                this.state.amPm
            ),
            React.createElement("br", null),
            React.createElement(
                "span",
                { className: "date" },
                this.state.date
            )
        );
    }
});

ReactDOM.render(React.createElement(App, null), document.getElementById('clock'));