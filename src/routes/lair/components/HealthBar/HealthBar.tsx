import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import { Hearts } from 'common/components';
import { PauseButton } from './PauseButton/PauseButton';
import classes from './HealthBar.scss';
import { heart, brokenHeart } from 'assets/images/stats';

const HealthBar: React.FC = () => {
  const hearts = useTypedSelector((state) => state.hearts);
  return (
    <div className={classes.container}>
      <PauseButton/>
      <div className={classes.heartsLong}>
        {Array.from({ length: 10 - hearts }, (_, index) => (
          <img
            className={classes.brokenHeartIcon}
            src={brokenHeart}
            key={index}
          />
        ))}
        {Array.from({ length: hearts }, (_, index) => (
          <img className={classes.heartIcon} src={heart} key={index} />
        ))}
        <span className={classes.count}>{hearts}</span>
      </div>
      <Hearts extraClassname={classes.heartsShort} />
    </div>
  );
};

export { HealthBar };
