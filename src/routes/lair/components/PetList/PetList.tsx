import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import { PetListItem } from './PetListItem/PetListItem';
import classes from './PetList.scss';

const PetList: React.FC = () => {
  const petIDs = useTypedSelector((state) => state.pets.map((pet) => pet.id));
  return (
    <menu className={classes.container}>
      {petIDs.map((id, index) => (
        <PetListItem id={id} key={index} />
      ))}
    </menu>
  );
};

export { PetList };
