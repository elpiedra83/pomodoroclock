import { useState } from "react";
import Break from "./Break";
import Times from "./Times";
import Buttons from "./Buttons";
import "./App.css";

const App = () => {
  const [time, setTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [isStart, setIsStart] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [breakAudio, setBreakAudio] = useState(
    new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-magic-sweep-game-trophy-257.mp3"
    )
  );

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };

  const playBreakAudio = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
  };
  const changeTime = (minute, type) => {
    if (type === "break") {
      if (breakTime <= 60 && minute < 0) return;
      setBreakTime((prev) => {
        return prev + minute;
      });
    } else {
      if (time <= 60 && minute < 0) return;
      setTime((prev) => {
        return prev + minute;
      });
    }
  };

  const timeHandler = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVariable = onBreak;
    if (!isStart) {
      let interval = setInterval(() => {
        date = new Date().getTime();
        if (date > nextDate) {
          setTime((prev) => {
            if (prev <= 0 && !onBreakVariable) {
              playBreakAudio();
              onBreakVariable = true;
              setOnBreak(true);
              return breakTime;
            } else if (prev <= 0 && onBreakVariable) {
              playBreakAudio();
              onBreakVariable = false;
              setOnBreak(false);
              return time;
            }
            return prev - 1;
          });
          nextDate += second;
        }
      }, 30);
      localStorage.clear();
      localStorage.setItem("interval-id", interval);
    }
    if (isStart) {
      clearInterval(localStorage.getItem("interval-id"));
    }
    setIsStart(!isStart);
  };

  const reset = () => {
    setTime(25 * 60);
    setBreakTime(5 * 60);
    setIsStart(false);
    clearInterval(localStorage.getItem("interval-id"));
  };
  return (
    <div className="pomodoro-clock">
      <div className="pomodoro-clock-header">
        <h1 className="pomodoro-clock-header-name">Il Pomodoro relogio</h1>
      </div>
      <Break
        title={"break length"}
        changeTime={changeTime}
        type={"break"}
        time={breakTime}
        formatTime={formatTime}
        isStart={isStart}
      />
      <Times
        title={onBreak ? "break" : "session"}
        changeTime={changeTime}
        type={"session"}
        time={time}
        formatTime={formatTime}
        isStart={isStart}
      />
      <Buttons isStart={isStart} reset={reset} timeHandler={timeHandler} />
    </div>
  );
};

export default App;
