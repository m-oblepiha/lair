import { ID, IPet } from 'common/types';
import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from 'redux/hooks';
import { death } from 'redux/actions';
import { selectPet } from 'common/utils';
import { PetAttribute, PetStat } from './components';
import classes from './PetRoute.scss';
import { avatars } from 'assets/images/avatars';
import { heart } from 'assets/images/stats';
import levelup from 'assets/images/levelup.png';

const PetRoute: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const routeState = useLocation().state as { id: ID };
  const mana = useTypedSelector((state) => state.mana);
  const hearts = useTypedSelector((state) => state.hearts);
  const pet = useTypedSelector((state) =>
    selectPet(state.pets, routeState.id)
  ) as IPet | null;

  if (!pet) return <Navigate to="/lair" />;
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <span className={classes.name}>{pet.name}</span>
        <img className={classes.avatar} src={avatars[pet.avatar]} />
        <span className={classes.sleep}>
          {pet.stats.isAwake ? 'не спит' : 'спит'}
        </span>
        <span className={classes.age}>
          {pet.stats.age * 3 > pet.attributes.maxAge * 2 ? 'старый' : 'молодой'}
        </span>
      </div>
      <div className={classes.stats}>
        <PetStat id={pet.id} stat="health" />
        <PetStat id={pet.id} stat="morale" />
        <PetStat id={pet.id} stat="hunger" />
        <PetStat id={pet.id} stat="fatigue" />
      </div>
      <div className={classes.attributes}>
        <PetAttribute id={pet.id} attribute="vitality" />
        <PetAttribute id={pet.id} attribute="willpower" />
        <PetAttribute id={pet.id} attribute="supply" />
        <PetAttribute id={pet.id} attribute="friendliness" />
      </div>
      <div className={classes.mana}>
        <span>{mana}</span>
        <img src={levelup} />
      </div>
      <div className={classes.hearts}>
        <span>{hearts}</span>
        <img src={heart} />
      </div>
      <button className={classes.return} onClick={() => navigate('/lair')}>
        {'НАЗАД'}
      </button>
      <button
        className={classes.kill}
        onClick={() => dispatch(death({ target: pet }))}
        disabled={hearts === 0}
      >
        {'УБИТЬ'}
      </button>
    </div>
  );
};

if (module.hot) module.hot.accept();

export default PetRoute;
