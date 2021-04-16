import React from "react";
import "./Times.css";

const formatTime = (timeLeftInSecond) => {
  let minute = Math.floor(timeLeftInSecond / 60);
  if (minute < 10) minute = "0" + minute;

  let second = timeLeftInSecond - 60 * minute;
  if (second < 10) second = "0" + second;

  return `${minute}:${second}`;
};

const Times = ({
  timeLabel,
  timeLeftInSecond,
  isStart,
  onDecreaseSession,
  onIncreaseSession,
}) => {
  const btnClassName = isStart ? "disable" : "";
  return (
    <div className="times">
      <div className="times-content">
        <button
          className={btnClassName}
          id="session-decrement"
          onClick={onDecreaseSession}
        >
          -
        </button>
        <label id="timer-label">{timeLabel}</label>
        <span id="time-left">{formatTime(timeLeftInSecond)}</span>
        <button
          className={btnClassName}
          id="session-increment"
          onClick={onIncreaseSession}
        >
          +
        </button>
      </div>
    </div>
  );
};
export default Times;
