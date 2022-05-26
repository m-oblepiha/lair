import { ID } from 'common/types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from 'redux/hooks';
import { selectPet } from 'common/utils';
import classes from './PetRoute.scss';

const PetRoute: React.FC = () => {
  const routeState = useLocation().state as { id: ID };

  const dispatch = useTypedDispatch();
  const pet = useTypedSelector((state) => selectPet(state.pets, routeState.id));

  return (
    <div className={classes.container}>
      <Link to="/lair">{`Экран ${pet.name}`}</Link>
    </div>
  );
};

if (module.hot) module.hot.accept();

export default PetRoute;
