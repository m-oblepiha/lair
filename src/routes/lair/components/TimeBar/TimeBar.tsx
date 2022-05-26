import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import classes from './TimeBar.scss';
import { morning, day, evening, night } from 'assets/images/timesOfDay';
import levelup from 'assets/images/levelup.png';

const iconsMap = {
  1: morning,
  2: day,
  3: evening,
  4: night,
};

const TimeBar: React.FC = () => {
  const time = useTypedSelector((state) => state.time);
  const mana = useTypedSelector((state) => state.mana);

  return (
    <div className={classes.container}>
      <img className={classes.manaIcon} src={levelup} />
      <span className={classes.mana}>{mana}</span>
      <span className={classes.day}>{`ДЕНЬ ${time.day}`}</span>
      <img className={classes.dayIcon} src={iconsMap[time.phase]} />
    </div>
  );
};

export { TimeBar };
