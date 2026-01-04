import React, { useState, useEffect, useRef } from "react";
function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    clearInterval(intervalIdRef.current);

  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }
  function stop() {
    isRunning(false);
  }
  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }
  function formatTime() {
    let hours = math.floor(elapsedTime / (1000*60*60));
    let minitues = math.floor(elapsedTime / (1000*60) % 60);
    let seconds = math.floor(elapsedTime / (1000) % 60);
    let milliseconds = math.floor((elapsedTime % 1000) /10);


    return `${minitues}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button onClick={start} className="start-button">
          Start
        </button>
        <button onClick={stop} className="stop-button">
          Stop
        </button>
        <button onClick={reset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
}
export default Stopwatch;
