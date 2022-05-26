import React from 'react';
import classes from './Fallback.scss';
import reload from 'assets/images/reload.png';

const Fallback: React.FC = () => {
  return (
    <div className={classes.container}>
      <p className={classes.message}>{'Все в порядке?'}</p>
      <button
        className={classes.button}
        onClick={() => window.location.reload()}
      >
        <img src={reload} alt="reload" />
      </button>
      <p className={classes.message}>{'Вернись в сеть.'}</p>
    </div>
  );
};

export { Fallback };
