import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import { SummonButton } from '../SummonButton/SummonButton';
import { PetListItem } from '../PetListItem/PetListItem';
import classes from './PetScreen.scss';
import listItemClasses from './PetScreenItem.scss';

type Props = {
  close: () => void;
};

const PetScreen: React.FC<Props> = ({ close }) => {
  const petIDs = useTypedSelector((state) => state.pets.map((pet) => pet.id));
  return (
    <div className={classes.container}>
      <menu className={classes.pets}>
        {petIDs.map((id, index) => (
          <PetListItem id={id} key={index} classes={listItemClasses} />
        ))}
      </menu>
      <button className={classes.returnButton} onClick={close}>
        {'НАЗАД'}
      </button>
      <SummonButton extraClassname={classes.summonButton} />
    </div>
  );
};

export { PetScreen };
