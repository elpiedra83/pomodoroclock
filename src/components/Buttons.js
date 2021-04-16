import React from "react";
import "./Buttons.css";

const Buttons = ({ isStart, reset, timeHandler }) => {
  return (
    <div className="buttons">
      <button id="start_stop" onClick={timeHandler}>
        {isStart ? "⏸" : "▶"}
      </button>
      <button id="reset" onClick={reset}>
        🔃
      </button>
    </div>
  );
};

export default Buttons;
