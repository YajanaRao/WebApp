const App = React.createClass({

  getInitialState() {
    return {
      time: "00:00:00",
      amPm: "am",
      date: "Thursday 1 January 1970"
    }
  },

  componentDidMount() {
    this.loadInterval = setInterval(
      this.getTime, 1000
    );
  },

  getTime() {
    const
      takeTwelve = n => n > 12 ? n - 12 : n,
      addZero = n => n < 10 ? "0" + n : n,
      months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    setInterval(() => {
      let d, h, m, s, t, amPm;

      d = new Date();
      h = addZero(takeTwelve(d.getHours()));
      m = addZero(d.getMinutes());
      s = addZero(d.getSeconds());
      t = `${h}:${m}:${s}`;

      amPm = d.getHours() >= 12 ? "pm" : "am";
      week = weekday[d.getDay()]
      day = d.getDate();
      month = months[d.getMonth()];
      year = d.getFullYear();
      date = `${week}, ${day} ${month} ${year}`;

      this.setState({
        time: t,
        amPm: amPm,
        date: date
      });

    }, 1000);
  },

  render() {
    return (
      <div className="container">
        <span className={
          this.state.time === "00:00:00"
            ? "time blink"
            : "time"}
        > {this.state.time}
        </span>
        <span className="amPm">
          {this.state.amPm}
        </span><br />
        <span className="date">
          {this.state.date}
        </span>
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('clock')
);