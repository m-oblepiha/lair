import React from 'react';
import { Link } from 'react-router-dom';
import classes from './LairRoute.scss';

const LairRoute: React.FC = () => {
  return (
    <div className={classes.container}>
      <p className={classes.hello}>Это экран логова</p>
      <Link to="/pet">Перейти на экран питомца</Link>
      <Link to="/">Перейти на стартовый экран</Link>
    </div>
  );
};

if (module.hot) module.hot.accept();

export default LairRoute;
