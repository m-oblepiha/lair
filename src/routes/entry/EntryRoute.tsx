import React from 'react';
import { Link } from 'react-router-dom';
import classes from './EntryRoute.scss';

const EntryRoute: React.FC = () => {
  return (
    <div className={classes.container}>
      <p className={classes.hello}>Это стартовый экран</p>
      <Link to="/pet">Перейти на экран питомца</Link>
      <Link to="/lair">Перейти на экран логова</Link>
    </div>
  );
};

if (module.hot) module.hot.accept();

export default EntryRoute;
