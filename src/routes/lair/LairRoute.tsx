import React, { useReducer } from 'react';
import {
  Chat,
  HealthBar,
  PetList,
  PetScreen,
  SummonButton,
  TimeBar,
} from './components';
import classes from './LairRoute.scss';

const LairRoute: React.FC = () => {
  const [isPetScreenShown, setIsPetScreenShown] = useReducer(
    (state: boolean) => !state,
    false
  );
  return (
    <div className={classes.container}>
      <HealthBar />
      {isPetScreenShown && <PetScreen close={setIsPetScreenShown} />}
      <button className={classes.petsButton} onClick={setIsPetScreenShown}>
        {'ПИТОМЦЫ'}
      </button>
      <PetList />
      <SummonButton extraClassname={classes.summonButton} />
      <Chat />
      <TimeBar />
    </div>
  );
};

if (module.hot) module.hot.accept();

export default LairRoute;
