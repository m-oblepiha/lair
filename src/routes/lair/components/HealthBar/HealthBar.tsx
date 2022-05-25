import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import classes from './HealthBar.scss';
import { heart, brokenHeart } from 'assets/images/stats';

const HealthBar: React.FC = () => {
  const hearts = useTypedSelector((state) => state.hearts);
  return (
    <div className={classes.container}>
      <div className={classes.heartsLong}>
        {Array.from({ length: 10 - hearts }, (item, index) => (
          <img
            className={classes.brokenHeartIcon}
            src={brokenHeart}
            key={index}
          />
        ))}
        {Array.from({ length: hearts }, (item, index) => (
          <img className={classes.heartIcon} src={heart} key={index} />
        ))}
      </div>
      <div className={classes.heartsShort}>
        <img className={classes.heartIcon} src={heart} />
      </div>
      <span className={classes.count}>{hearts}</span>
    </div>
  );
};

export { HealthBar };
