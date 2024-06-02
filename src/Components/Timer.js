const Timer = ({ handleClick, min, sec, mode }) => {
  return (
    <div className="timer" onClick={handleClick}>
      <div id="timer-label">
        <h2>{mode}</h2>
      </div>
      <p>Time Left</p>
      <p id="time-left">
        {min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}
      </p>
      <button id="start_stop">Start/Stop</button>
      <button id="reset">Reset</button>
      <audio
        id="beep"
        src="https://www.pacdv.com/sounds/interface_sound_effects/sound10.mp3"
        type="audio/mp3"
        preload="none"
      ></audio>
    </div>
  );
};

export default Timer;
