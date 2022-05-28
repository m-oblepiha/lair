import type { ID } from 'common/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks';
import { selectPet } from 'common/utils';
import { Avatar, PetIcon } from 'common/components';
import classnames from 'classnames';
import classes from './PetListItem.scss';
import { hunger, fatigue, heart, morale } from 'assets/images/stats';

type Props = {
  id: ID;
};

const PetListItem: React.FC<Props> = ({ id }) => {
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
        <div className={classes.stat}>
          <span className={classes.count}>{pet.stats.health}</span>
          <PetIcon src={heart} extraClassname={classes.icon} />
        </div>
        <div className={classes.stat}>
          <span className={classes.count}>{pet.stats.morale}</span>
          <PetIcon src={morale} extraClassname={classes.icon} />
        </div>
        <div className={classes.stat}>
          <span className={classes.count}>{pet.stats.hunger}</span>
          <PetIcon src={hunger} extraClassname={classes.icon} />
        </div>
        <div className={classes.stat}>
          <span className={classes.count}>{pet.stats.fatigue}</span>
          <PetIcon src={fatigue} extraClassname={classes.icon} />
        </div>
      </div>
    </li>
  );
};

export { PetListItem };
