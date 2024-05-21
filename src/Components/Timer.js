const Timer = ({ handleClick, seLeng, brLeng }) => {
  return (
    <div className="timer" id="timer-label" onClick={handleClick}>
      <h2>Session</h2>
      <p id="time-left">{seLeng}:00</p>
      <button id="start_stop">Start/Stop</button>
      <button id="reset">Reset</button>
    </div>
  );
};

export default Timer;
