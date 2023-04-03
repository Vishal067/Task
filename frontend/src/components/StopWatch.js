
import React, { useState, useEffect } from "react";
import { insertTime } from "../API/api";


const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [splitTime, setSplitTime] = useState(0);
    // state to check stopwatch running or not
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
        // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
        intervalId = setInterval(() => setTime(time + 1), 10);
    }
        return () => clearInterval(intervalId);
    }, [time, isRunning], [splitTime]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    if(window.confirm("Are you sure you want to reset?")){
        // if yes then split time and then reset to 0
        setSplitTime(`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`);
        setTime(0);
        setIsRunning(false);
        console.log("reset") 
        console.log("split time",splitTime)
        const data = {
            time: splitTime,
            email: localStorage.getItem("email")
        }
        insertTime(data)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
            alert(err.response.data)
        })
    }
    else{
        console.log("not reset")
    }
  };

  const split = () => {
    setSplitTime(`${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`);
    console.log("split time",splitTime);
    };

    // console.log("splt time", splitTime)
  return (
    <div>
      <p>
        {hours}:{minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div>
        <button onClick={startAndStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={reset}>
          Reset
        </button>
        <button onClick={split}>
          Split
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;