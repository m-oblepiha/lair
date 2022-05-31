import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import { PetListItem } from '../PetListItem/PetListItem';
import classes from './PetList.scss';
import listItemClasses from './PetListItem.scss';

const PetList: React.FC = () => {
  const petIDs = useTypedSelector((state) => state.pets.map((pet) => pet.id));
  return (
    <menu className={classes.container}>
      {petIDs.map((id, index) => (
        <PetListItem id={id} key={index} classes={listItemClasses} />
      ))}
    </menu>
  );
};

export { PetList };
