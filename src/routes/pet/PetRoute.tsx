import React from 'react';
import { Link } from 'react-router-dom';
import classes from './PetRoute.scss';

const PetRoute: React.FC = () => {
  return (
    <div className={classes.container}>
      <Link to="/lair">Перейти на экран логова</Link>
    </div>
  );
};

if (module.hot) module.hot.accept();

export default PetRoute;
