import { useEffect, useState } from "react";

interface TimerProps {
  sec: number;
  getTime:(hour:number,mins:number,sec:number)=>void
}

const Timer = ({ sec, getTime }: TimerProps) => {
  const [duration, setDuration] = useState({
    hours: Math.floor(sec / 3600),
    minutes: Math.floor((sec % 3600) / 60),
    seconds: sec % 60,
  });

  useEffect(() => {
    if (sec <= 0) return; // Avoid running if seconds are 0

    const intervalId = setInterval(() => {
      setDuration((prev) => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds;

        if (totalSeconds <= 0) {
          clearInterval(intervalId);
          return prev;
        }

        const newSeconds = totalSeconds - 1;
        return {
          hours: Math.floor(newSeconds / 3600),
          minutes: Math.floor((newSeconds % 3600) / 60),
          seconds: newSeconds % 60,
        };
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [sec]);

  useEffect(()=>{
    getTime( duration.hours,duration.minutes,duration.seconds)
  },[duration.seconds])

  return (
    <div>
      <p>
        {`${duration.hours}  h : ${duration.minutes} m : ${duration.seconds} s`}
      </p>
    </div>
  );
};

export default Timer;
