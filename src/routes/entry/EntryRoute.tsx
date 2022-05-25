import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch } from 'redux/hooks';
import { summon } from 'redux/actions';
import classes from './EntryRoute.scss';

const EntryRoute: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();

  const proceed = () => {
    dispatch(summon());
    navigate('./lair');
  };

  return (
    <div className={classes.container}>
      <p className={classes.intro}>{'Вы бессмертны и одиноки.'}</p>
      <p className={classes.intro}>{'Призовите себе питомца.'}</p>
      <button className={classes.button} onClick={proceed}>
        {'ПРИЗВАТЬ'}
      </button>
    </div>
  );
};

if (module.hot) module.hot.accept();

export default EntryRoute;
