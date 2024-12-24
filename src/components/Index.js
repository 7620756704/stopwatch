import React, { useState, useEffect, useRef } from 'react';

const Index = () => {
  const [time, setTime] = useState(0); 
  const [isActive, setIsActive] = useState(false); 
  const intervalRef = useRef(null); 

  
  const start = () => {
    if (!isActive) {
      setIsActive(true); 
    }
  };

  
  const stop = () => {
    setIsActive(false);
    clearInterval(intervalRef.current); // Stop the interval
  };

  
  const reset = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
    setTime(0); 
  };

  
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); 
      }, 10);
    } else {
      clearInterval(intervalRef.current); 
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  
  const formatTime = (time) => {
    const ms = Math.floor(time % 1000);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);
    return  { hr : `${hours}` , min : `${minutes}` , sec : `${seconds}` , ms : `${ms}`}
  };

  

  return (
      
    <div>
      <div className='heading'>
        <h1>Stopwatch</h1>
      </div>
      <div className='main_body'>
         <div className='timer'>
             <h4>{formatTime(time).hr}<span>hr</span></h4>
             <h4>{formatTime(time).min}<span>min</span></h4>
             <h4>{formatTime(time).sec}<span>sec</span></h4>
            <h4>{formatTime(time).ms}<span>ms</span></h4>
         </div>
         <div className='control-btns'>
              <button onClick={start} disabled={isActive} className='btn btn1'>Start</button>
               <button onClick={stop} disabled={!isActive} className='btn btn2'>Stop</button>
               <button onClick={reset} className='btn btn3'>Reset</button>
         </div>    
      </div>    
    </div>
  );
};

export default Index;
