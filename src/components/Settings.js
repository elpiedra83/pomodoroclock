import React from "react";
import "./Settings.css";

const Settings = ({
  breakLength,
  isStart,
  onDecreaseBreak,
  onIncreaseBreak,
}) => {
  const btnClassName = isStart ? "disable" : "";

  return (
    <div className="settings">
      <div className="settings-section">
        <label id="break-label">Break Length</label>
        <div>
          <button
            className={btnClassName}
            id="break-decrement"
            onClick={onDecreaseBreak}
          >
            -
          </button>
          <span id="break-length">{breakLength}</span>
          <button
            className={btnClassName}
            id="break-increment"
            onClick={onIncreaseBreak}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
export default Settings;
