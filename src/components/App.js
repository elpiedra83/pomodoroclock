import { createRef, useState } from "react";
import Settings from "./Settings";
import Times from "./Times";
import Controller from "./Controller";
import "./App.css";

const App = ({ defaultBreakLength, defaultSessionLength }) => {
  const audioBeep = createRef();

  const { breakLength, setBreakLength } = useState(
    Number.parseInt(defaultBreakLength, 10)
  );
  const { sessionLength, setSessionLength } = useState(
    Number.parseInt(defaultSessionLength, 10)
  );
  const { timeLabel, setTimeLabel } = useState("Session");
  const { timeLeftInSecond, setTimeLeftInSecond } = useState(
    Number.parseInt(defaultSessionLength, 10) * 60
  );
  const { isStart, setIsStart } = useState(false);
  const { timerInterval, setTimerInterval } = useState(null);

  console.log(Number.parseInt(defaultBreakLength, 10));
  console.log(Number.parseInt(defaultSessionLength, 10));

  const onIncreaseBreak = () => {
    if (breakLength < 60 && !isStart) {
      setBreakLength(breakLength + 1);
    }
  };

  const onDecreaseBreak = () => {
    if (breakLength > 1 && !isStart) {
      setBreakLength(breakLength - 1);
    }
  };

  const onIncreaseSession = () => {
    if (sessionLength < 60 && !isStart) {
      setSessionLength(sessionLength + 1);
      setTimeLeftInSecond((sessionLength + 1) * 60);
    }
  };

  const onDecreaseSession = () => {
    if (sessionLength > 1 && !isStart) {
      setSessionLength(sessionLength - 1);
      setTimeLeftInSecond((sessionLength - 1) * 60);
    }
  };

  const onReset = () => {
    setBreakLength(Number.parseInt(defaultBreakLength, 10));
    setSessionLength(Number.parseInt(defaultSessionLength, 10));
    setTimeLabel("Session");
    setTimeLeftInSecond(Number.parseInt(defaultSessionLength, 10) * 60);
    setIsStart(false);
    setTimerInterval(null);
    audioBeep.current.pause();
    audioBeep.current.currentTime = 0;
    timerInterval && clearInterval(timerInterval);
  };

  const onStartStop = () => {
    if (!isStart) {
      setIsStart(!isStart);
      setTimerInterval(
        setInterval(() => {
          decreaseTimer();
          phaseControl();
        }, 1000)
      );
    } else {
      audioBeep.current.pause();
      audioBeep.current.currentTime = 0;
      timerInterval && clearInterval(timerInterval);
      setIsStart(!isStart);
      setTimerInterval(null);
    }
  };

  const decreaseTimer = () => {
    setTimerInterval(timeLeftInSecond - 1);
  };

  const phaseControl = () => {
    if (timeLeftInSecond === 0) {
      audioBeep.current.play();
    } else if (timeLeftInSecond === -1) {
      if (timeLabel === "Session") {
        setTimeLabel("Break");
        setTimeLeftInSecond(breakLength * 60);
      } else {
        setTimeLabel("Session");
        setTimeLeftInSecond(sessionLength * 60);
      }
    }
  };

  return (
    <div className="pomodoro-clock">
      <div className="pomodoro-clock-header">
        <h1 className="pomodoro-clock-header-name">Il Pomodoro</h1>
      </div>

      <Settings
        breakLength={breakLength}
        // sessionLength={sessionLength}
        isStart={isStart}
        onDecreaseBreak={onDecreaseBreak}
        onIncreaseBreak={onIncreaseBreak}
      />

      <Times
        timeLabel={timeLabel}
        timeLeftInSecond={timeLeftInSecond}
        isStart={isStart}
        onDecreaseSession={onDecreaseSession}
        onIncreaseSession={onIncreaseSession}
      />

      <Controller
        onReset={onReset}
        onStartStop={onStartStop}
        isStart={isStart}
      />

      <audio
        id="beep"
        preload="auto"
        src="https://goo.gl/65cBl1"
        ref={audioBeep}
      ></audio>
    </div>
  );
};

export default App;
