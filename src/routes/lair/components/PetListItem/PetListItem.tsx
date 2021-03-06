import type { ID } from 'common/types';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks';
import { unsafeSelectPet, useColorBlink } from 'common/utils';
import { Avatar, PetIcon } from 'common/components';
import classnames from 'classnames';
import classes from './PetListItem.scss';
import { hunger, fatigue, heart, morale } from 'assets/images/stats';

type StatProps = {
  src: string;
  value: number;
  reverse?: boolean;
  classes: { [key: string]: string };
};

const PetListStat: React.FC<StatProps> = ({ src, value, reverse, classes }) => {
  const countRef = useRef<HTMLSpanElement>(null);

  useColorBlink({ ref: countRef, value, reverse });

  return (
    <div className={classes.stat}>
      <PetIcon src={src} extraClassname={classes.icon} />
      <span className={classes.count} ref={countRef}>
        {value}
      </span>
    </div>
  );
};

type Props = {
  id: ID;
  classes: { [key: string]: string };
};

const PetListItem: React.FC<Props> = ({ id, classes }) => {
  const navigate = useNavigate();

  const pet = useTypedSelector((state) => unsafeSelectPet(state.pets, id));
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
          [classes.avatarSleeping]: !!pet.stats.sleep,
        })}
      />
      <span className={classes.petName}>{pet.name}</span>
      <div className={classes.stats}>
        <PetListStat src={heart} value={pet.stats.health} classes={classes} />
        <PetListStat src={morale} value={pet.stats.morale} classes={classes} />
        <PetListStat
          src={hunger}
          value={10 - pet.stats.hunger}
          classes={classes}
        />
        <PetListStat
          src={fatigue}
          value={10 - pet.stats.fatigue}
          classes={classes}
        />
      </div>
    </li>
  );
};

export { PetListItem };
