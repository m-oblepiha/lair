import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import { SummonButton } from '../SummonButton/SummonButton';
import { PetScreenItem } from './PetScreenItem/PetScreenItem';
import classes from './PetScreen.scss';

type Props = {
  close: () => void;
};

const PetScreen: React.FC<Props> = ({ close }) => {
  const petIDs = useTypedSelector((state) => state.pets.map((pet) => pet.id));
  return (
    <div className={classes.container}>
      <menu className={classes.pets}>
        {petIDs.map((id, index) => (
          <PetScreenItem id={id} key={index} />
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
