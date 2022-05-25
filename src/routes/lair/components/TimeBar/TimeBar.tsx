import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import classes from './TimeBar.scss';
import { morning, day, evening, night } from 'assets/images/timesOfDay';

const iconsMap = {
  1: morning,
  2: day,
  3: evening,
  4: night,
};

const TimeBar: React.FC = () => {
  const time = useTypedSelector((state) => state.time);
  return (
    <div className={classes.container}>
      <span className={classes.day}>{`ДЕНЬ ${time.day}`}</span>
      <img className={classes.icon} src={iconsMap[time.phase]} />
    </div>
  );
};

export { TimeBar };
