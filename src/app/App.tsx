import React from 'react';
import classes from './style.scss';

const App: React.FC = () => {
  return <span className={classes.hello}>hella</span>;
};

if (module.hot) module.hot.accept();

export { App };
