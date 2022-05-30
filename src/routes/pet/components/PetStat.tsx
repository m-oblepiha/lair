import type { ID, Stat } from 'common/types';
import React, { useRef } from 'react';
import { useTypedSelector, useTypedDispatch } from 'redux/hooks';
import { increaseStat, decreaseStat } from 'redux/actions';
import { unsafeSelectPet, useColorBlink } from 'common/utils';
import { PetIcon } from 'common/components';
import classes from './PetProperty.scss';
import { heart as health, morale, fatigue, hunger } from 'assets/images/stats';

const statImageMap = { health, morale, fatigue, hunger };

const statTitleMap = {
  health: 'здоровье',
  morale: 'мораль',
  fatigue: 'сон',
  hunger: 'еда',
};

type Props = {
  id: ID;
  stat: Stat;
};

const PetStat: React.FC<Props> = ({ id, stat }) => {
  const dispatch = useTypedDispatch();

  const pet = useTypedSelector((state) => unsafeSelectPet(state.pets, id));
  const mana = useTypedSelector((state) => state.mana);
  const hearts = useTypedSelector((state) => state.hearts);

  const reverse = stat === 'fatigue' || stat === 'hunger';

  const value = reverse ? 10 - pet.stats[stat] : pet.stats[stat];

  const countRef = useRef<HTMLSpanElement>(null);

  useColorBlink({
    ref: countRef,
    value,
  });

  return (
    <div className={classes.container}>
      <PetIcon extraClassname={classes.icon} src={statImageMap[stat]} />
      <span className={classes.title}>{statTitleMap[stat]}</span>
      <button
        className={classes.button}
        onClick={() =>
          dispatch(
            reverse ? increaseStat({ id, stat }) : decreaseStat({ id, stat })
          )
        }
        disabled={value < 2 || mana < 1 || hearts === 0}
      >
        {'-'}
      </button>
      <span className={classes.count} ref={countRef}>
        {value}
      </span>
      <button
        className={classes.button}
        onClick={() =>
          dispatch(
            reverse ? decreaseStat({ id, stat }) : increaseStat({ id, stat })
          )
        }
        disabled={value > 8 || mana < 1 || hearts === 0}
      >
        {'+'}
      </button>
    </div>
  );
};

export { PetStat };
