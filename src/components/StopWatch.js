// import styled from "styled-components";
// import yellowQuestion from "../../../assets/yellowQuestion.svg";
// import clock from "../../../assets/clock.svg";
import { useState, useEffect } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval = null;

    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [start]);

  return (
    <div className="stopwatch">
      <div>
        <div>
          <div className="time">
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
          </div>
        </div>
        <div className="contBox">
          <span
            className="reset"
            onClick={() => {
              setTime(0);
              setStart(false);
            }}
          >
            ■
          </span>
          <span className="start" onClick={() => setStart(true)}>
            ▶
          </span>
          <span className="pause" onClick={() => setStart(false)}>
            ❚❚
          </span>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
