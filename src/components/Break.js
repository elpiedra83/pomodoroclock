import "./Break.css";

const Break = ({ title, changeTime, type, time, formatTime, isStart }) => {
  const btnClassName = isStart ? "disable" : "";
  return (
    <div className="break">
      <div className="break-section">
        <label id="break-label">{title}</label>
        <div>
          <button
            className={btnClassName}
            id="break-decrement"
            onClick={() => changeTime(-60, type)}
          >
            ➖
          </button>
          <span id="break-length">{formatTime(time)}</span>
          <button
            className={btnClassName}
            id="break-increment"
            onClick={() => changeTime(60, type)}
          >
            ➕
          </button>
        </div>
      </div>
    </div>
  );
};
export default Break;
