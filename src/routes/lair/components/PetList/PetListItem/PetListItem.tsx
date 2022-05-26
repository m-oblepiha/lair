import type { ID } from 'common/types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from 'redux/hooks';
import { selectPet } from 'common/utils';
import classnames from 'classnames';
import classes from './PetListItem.scss';
import { avatars } from 'assets/images/avatars';
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
      <img
        src={avatars[pet.avatar]}
        className={classnames(classes.avatar, {
          [classes.avatarSleeping]: !pet.stats.isAwake,
        })}
      />
      <span className={classes.petName}>{pet.name}</span>
      <div className={classes.stats}>
        <div className={classes.stat}>
          <span className={classes.count}>{pet.stats.health}</span>
          <img src={heart} className={classes.icon} />
        </div>
        <div className={classes.stat}>
          <span className={classes.count}>{pet.stats.morale}</span>
          <img src={morale} className={classes.icon} />
        </div>
        <div className={classes.stat}>
          <span className={classes.count}>{pet.stats.hunger}</span>
          <img src={hunger} className={classes.icon} />
        </div>
        <div className={classes.stat}>
          <span className={classes.count}>{pet.stats.fatigue}</span>
          <img src={fatigue} className={classes.icon} />
        </div>
      </div>
    </li>
  );
};

export { PetListItem };
