import { useStopwatch } from "./useStopwatch";

function Stopwatch() {
  const {
    isRunning,
    elapsedTime,
    laps,
    start,
    stop,
    reset,
    lap,
    formatTime
  } = useStopwatch();

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>

      <div className="controls">
        <button onClick={start} disabled={isRunning} className="start-button">
          Start
        </button>
        <button onClick={stop} disabled={!isRunning} className="stop-button">
          Stop
        </button>
        <button onClick={lap} disabled={!isRunning} className="lap-button">
          Lap
        </button>
        <button
          onClick={reset}
          disabled={elapsedTime === 0}
          className="reset-button"
        >
          Reset
        </button>
      </div>

      <ul className="laps">
        {laps.map((lapTime, i) => (
          <li key={i}>
            Lap {i + 1} — {formatTime(lapTime)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stopwatch;
