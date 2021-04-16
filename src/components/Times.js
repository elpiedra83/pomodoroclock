import React from "react";
import "./Times.css";

const Times = ({ title, changeTime, type, time, formatTime, isStart }) => {
  const btnClassName = isStart ? "disable" : "";
  return (
    <div className="times">
      <button
        className={btnClassName}
        id="session-decrement"
        onClick={() => changeTime(-60, type)}
      >
        ➖
      </button>
      <div className="times-content">
        <label id="timer-label">{title}</label>
        <span id="time-left">{formatTime(time)}</span>
      </div>
      <button
        className={btnClassName}
        id="session-increment"
        onClick={() => changeTime(60, type)}
      >
        ➕
      </button>
    </div>
  );
};
export default Times;
