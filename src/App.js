import { useRef, useEffect, useState } from "react";
import "./App.css";
import Control from "./Components/Control";
import Timer from "./Components/Timer";

function App() {
  const [seLeng, setSeLeng] = useState(25);
  const [brLeng, setBrLeng] = useState(5);
  const [min, setMin] = useState(25);
  const [sec, setSec] = useState(0);
  const [pause, setPause] = useState(false);
  const [active, setActive] = useState(true);
  const [mode, setMode] = useState("Session");

  const interval = useRef(null);

  let nameControls = ["Break", "Session"];

  useEffect(() => {
    if (pause) {
      interval.current = setInterval(() => {
        if (sec < 0) {
          console.log("sec", sec);
        }
        if (min === 0 && sec === 0) {
          let playPromise = document.querySelector("#beep").play();

          if (playPromise !== undefined) {
            playPromise
              .then((_) => {
                if (active) {
                  setMin(brLeng);
                  setSec(0);
                  setMode("Break");
                  setActive(!active);
                } else {
                  setMin(seLeng);
                  setSec(0);
                  setMode("Session");
                  setActive(!active);
                }
              })
              .catch((error) => {
                // Auto-play was prevented
                // Show paused UI.
                console.log(error);
              });
          }

          clearInterval(interval.current);
        }
        if (min > 0 && sec === 0) {
          setSec(59);
          let newMin = min - 1;
          setMin(newMin);
        }
        if (sec > 0) {
          let secNew = sec - 1;
          setSec(secNew);
        }
      }, 1000);
    }
    return () => clearInterval(interval.current);
  }, [pause, sec, min, brLeng, seLeng, mode, active]);

  const handleClick = (e) => {
    if (e.target.matches("button")) {
      if (e.target.matches("#start_stop")) {
        setPause(!pause);
      }

      if (e.target.matches("#reset")) {
        reset();
      }

      timerLength(e.target);
    }
  };

  const reset = () => {
    clearInterval(interval.current);
    interval.current = null;
    setMode("Session");
    setPause(false);
    setActive(true);
    setMin(25);
    setSec(0);
    setSeLeng(25);
    setBrLeng(5);
    document.querySelector("#beep").pause();
    document.querySelector("#beep").currentTime = 0;
  };

  const timerLength = (data) => {
    if (data.matches("#break-decrement")) {
      if (brLeng > 1) {
        setBrLeng((prev) => prev - 1);
      }
    }
    if (data.matches("#break-increment")) {
      if (brLeng < 60) {
        setBrLeng((prev) => prev + 1);
      }
    }
    if (data.matches("#session-decrement")) {
      if (seLeng > 1) {
        let newSession = seLeng - 1;
        setSeLeng(newSession);
        setMin(newSession);
      }
    }
    if (data.matches("#session-increment")) {
      if (seLeng < 60) {
        let newSession = seLeng + 1;
        setSeLeng(newSession);
        setMin(newSession);
      }
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Pomodoro</h1>
        {nameControls.map((data, i) => {
          return (
            <Control
              key={i}
              type={data}
              brLeng={brLeng}
              seLeng={seLeng}
              handleClick={handleClick}
            />
          );
        })}
        <Timer min={min} sec={sec} mode={mode} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
