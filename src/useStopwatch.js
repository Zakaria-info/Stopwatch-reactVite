import { useState, useEffect, useRef } from "react";

export function useStopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning]);

  const start = () => {
    if (isRunning) return;
    startTimeRef.current = Date.now() - elapsedTime;
    setIsRunning(true);
  };

  const stop = () => setIsRunning(false);

  const reset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const lap = () => {
    if (!isRunning) return;
    setLaps(prev => [...prev, elapsedTime]);
  };

  const formatTime = (time = elapsedTime) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);

    return (
      `${String(hours).padStart(2, "0")}:` +
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}:` +
      `${String(milliseconds).padStart(2, "0")}`
    );
  };

  return {
    isRunning,
    elapsedTime,
    laps,
    start,
    stop,
    reset,
    lap,
    formatTime
  };
}
