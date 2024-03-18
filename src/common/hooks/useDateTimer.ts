import { useEffect, useState } from 'react';

interface IUseDateTimerResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getDateDiff = (date1: Date, date2: Date) => {
  if (date1 > date2) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  let seconds = Math.floor((date2.getTime() - date1.getTime()) / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  const days = Math.floor(hours / 24);

  hours = hours - days * 24;
  minutes = minutes - days * 24 * 60 - hours * 60;
  seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export function useDateTimer(targetDate: Date): IUseDateTimerResult {
  const [state, setState] = useState<IUseDateTimerResult>(getDateDiff(new Date(), targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setState(getDateDiff(new Date(), targetDate));

      return () => {
        clearInterval(interval);
      };
    }, 1000);
  }, [targetDate]);

  return state;
}
