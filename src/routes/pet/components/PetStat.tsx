import type { ID, Stat } from 'common/types';
import React from 'react';
import { useTypedSelector, useTypedDispatch } from 'redux/hooks';
import { increaseStat, decreaseStat } from 'redux/actions';
import { selectPet } from 'common/utils';
import { PetIcon } from 'common/components';
import classes from './PetProperty.scss';
import { heart as health, morale, fatigue, hunger } from 'assets/images/stats';

const statImageMap = { health, morale, fatigue, hunger };

const statTitleMap = {
  health: 'здоровье',
  morale: 'мораль',
  fatigue: 'усталость',
  hunger: 'голод',
};

type Props = {
  id: ID;
  stat: Stat;
};

const PetStat: React.FC<Props> = ({ id, stat }) => {
  const dispatch = useTypedDispatch();
  const pet = useTypedSelector((state) => selectPet(state.pets, id));
  const mana = useTypedSelector((state) => state.mana);
  const hearts = useTypedSelector((state) => state.hearts);
  const value = pet.stats[stat];
  return (
    <div className={classes.container}>
      <PetIcon extraClassname={classes.icon} src={statImageMap[stat]} />
      <span className={classes.title}>{statTitleMap[stat]}</span>
      <button
        className={classes.button}
        onClick={() => dispatch(decreaseStat({ id, stat }))}
        disabled={value < 2 || mana < 1 || hearts === 0}
      >
        {'-'}
      </button>
      <span className={classes.count}>{value}</span>
      <button
        className={classes.button}
        onClick={() => dispatch(increaseStat({ id, stat }))}
        disabled={value > 8 || mana < 1 || hearts === 0}
      >
        {'+'}
      </button>
    </div>
  );
};

export { PetStat };
