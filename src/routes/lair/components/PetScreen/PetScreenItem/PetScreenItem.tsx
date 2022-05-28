import type { ID } from 'common/types';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks';
import { selectPet, useColorBlink } from 'common/utils';
import { Avatar, PetIcon } from 'common/components';
import classnames from 'classnames';
import classes from './PetScreenItem.scss';
import { hunger, fatigue, heart, morale } from 'assets/images/stats';

type StatProps = { src: string; value: number };

const PetScreenStat: React.FC<StatProps> = ({ src, value }) => {
  const countRef = useRef<HTMLSpanElement>(null);

  useColorBlink({ ref: countRef, value });

  return (
    <div className={classes.stat}>
      <span className={classes.count} ref={countRef}>
        {value}
      </span>
      <PetIcon src={src} extraClassname={classes.icon} />
    </div>
  );
};

type Props = {
  id: ID;
};

const PetScreenItem: React.FC<Props> = ({ id }) => {
  const navigate = useNavigate();

  const pet = useTypedSelector((state) => selectPet(state.pets, id));
  const openPetScreen = () => navigate('/pet', { state: { id } });

  return (
    <li
      className={classes.container}
      onClick={openPetScreen}
      onKeyUp={(event) => {
        if (event.key === 'Enter') openPetScreen();
      }}
      role="menuitem"
      tabIndex={0}
    >
      <Avatar
        avatar={pet.avatar}
        extraClassname={classnames(classes.avatar, {
          [classes.avatarSleeping]: !pet.stats.isAwake,
        })}
      />
      <span className={classes.petName}>{pet.name}</span>
      <div className={classes.stats}>
        <PetScreenStat src={heart} value={pet.stats.health} />
        <PetScreenStat src={morale} value={pet.stats.morale} />
        <PetScreenStat src={hunger} value={pet.stats.hunger} />
        <PetScreenStat src={fatigue} value={pet.stats.fatigue} />
      </div>
    </li>
  );
};

export { PetScreenItem };
