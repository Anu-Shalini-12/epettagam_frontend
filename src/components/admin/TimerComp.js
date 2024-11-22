import React, {useEffect} from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


  return (
    <div style={{textAlign: 'center'}}>
      <div style={{fontSize: '20px'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default function App(props) {

  return (
    <div style={{marginLeft:'-90%'}}>
      <MyTimer expiryTimestamp={props.time} />
    </div>
  );
}