import type { ID, Attribute } from 'common/types';
import React, { useRef } from 'react';
import { useTypedSelector, useTypedDispatch } from 'redux/hooks';
import { increaseAttribute, decreaseAttribute } from 'redux/actions';
import { unsafeSelectPet, useColorBlink } from 'common/utils';
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

  const pet = useTypedSelector((state) => unsafeSelectPet(state.pets, id));
  const mana = useTypedSelector((state) => state.mana);
  const hearts = useTypedSelector((state) => state.hearts);

  const value = pet.attributes[attribute];

  const countRef = useRef<HTMLSpanElement>(null);

  useColorBlink({ ref: countRef, value });

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
        disabled={value < 2 || mana < 5 || hearts === 0}
      >
        {'-'}
      </button>
      <span className={classes.count} ref={countRef}>
        {value}
      </span>
      <button
        className={classes.button}
        onClick={() => dispatch(increaseAttribute({ id, attribute }))}
        disabled={value > 8 || mana < 5 || hearts === 0}
      >
        {'+'}
      </button>
    </div>
  );
};

export { PetAttribute };
