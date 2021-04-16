import React from "react";
import "./Controller.css";

const Controller = ({ onReset, onStartStop, isStart }) => {
  return (
    <div className="controller">
      <button id="start_stop" onClick={onStartStop}>
        {isStart ? "Stop" : "Start"}
      </button>
      <button id="reset" onClick={onReset}>
        Reset
      </button>
    </div>
  );
};

export default Controller;
