import type { ID, Attribute } from 'common/types';
import React from 'react';
import { useTypedSelector, useTypedDispatch } from 'redux/hooks';
import { increaseAttribute, decreaseAttribute } from 'redux/actions';
import { selectPet } from 'common/utils';
import { PetIcon } from 'common/components';
import classes from './PetProperty.scss';
import {
  vitality,
  willpower,
  supply,
  friendliness,
} from 'assets/images/attributes';

const attributeImageMap = {
  vitality,
  willpower,
  supply,
  friendliness,
};

const attributeTitleMap = {
  vitality: 'стойкость',
  willpower: 'сила духа',
  supply: 'добыча',
  friendliness: 'няшность',
};

type Props = {
  id: ID;
  attribute: Attribute;
};

const PetAttribute: React.FC<Props> = ({ id, attribute }) => {
  const dispatch = useTypedDispatch();
  const pet = useTypedSelector((state) => selectPet(state.pets, id));
  const mana = useTypedSelector((state) => state.mana);
  const hearts = useTypedSelector((state) => state.hearts);
  const value = pet.attributes[attribute];
  return (
    <div className={classes.container}>
      <PetIcon
        extraClassname={classes.icon}
        src={attributeImageMap[attribute]}
      />
      <span className={classes.title}>{attributeTitleMap[attribute]}</span>
      <button
        className={classes.button}
        onClick={() => dispatch(decreaseAttribute({ id, attribute }))}
        disabled={value < 2 || mana < 3 || hearts === 0}
      >
        {'-'}
      </button>
      <span className={classes.count}>{value}</span>
      <button
        className={classes.button}
        onClick={() => dispatch(increaseAttribute({ id, attribute }))}
        disabled={value > 8 || mana < 3 || hearts === 0}
      >
        {'+'}
      </button>
    </div>
  );
};

export { PetAttribute };
