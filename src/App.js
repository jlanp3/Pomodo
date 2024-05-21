import { useState } from "react";
import "./App.css";
import Control from "./Components/Control";
import Timer from "./Components/Timer";

function App() {
  const [seLeng, setSeLeng] = useState(25);
  const [brLeng, setBrLeng] = useState(5);

  let nameControls = ["Break", "Session"];

  const handleClick = (e) => {
    if (e.target.matches("button")) {
      if (e.target.matches("#start_stop")) {
        console.log("start");
      }

      if (e.target.matches("#reset")) {
        return reset();
      }

      timerLength(e.target);
    }
  };

  const reset = () => {
    setSeLeng(25);
    setBrLeng(5);
  };

  const timer = () => {
    setTimeout(() => {}, 1000);
  };

  const timerLength = (data) => {
    if (data.matches("#break-decrement")) {
      if (brLeng > 0) {
        return setBrLeng(brLeng - 1);
      }
    }
    if (data.matches("#break-increment")) {
      if (brLeng < 60) {
        return setBrLeng(brLeng + 1);
      }
    }
    if (data.matches("#session-decrement")) {
      if (seLeng > 0) {
        return setSeLeng(seLeng - 1);
      }
    }
    if (data.matches("#session-increment")) {
      if (seLeng < 60) {
        return setSeLeng(seLeng + 1);
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
        <Timer brLeng={brLeng} seLeng={seLeng} handleClick={handleClick} />
      </div>
    </div>
  );
}

export default App;
