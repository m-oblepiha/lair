import React, { useReducer } from 'react';
import {
  Chat,
  HealthBar,
  PetList,
  PetScreen,
  SummonButton,
  TimeBar,
} from './components';
import classnames from 'classnames';
import classes from './LairRoute.scss';

const LairRoute: React.FC = () => {
  const [isPetScreenShown, setIsPetScreenShown] = useReducer(
    (state: boolean) => !state,
    false
  );
  return (
    <div className={classnames(classes.container)}>
      {isPetScreenShown && <PetScreen close={setIsPetScreenShown} />}
      <HealthBar />
      <button
        className={classes.petsButton}
        onClick={(event) => {
          setIsPetScreenShown();
          event.currentTarget.blur();
        }}
        tabIndex={isPetScreenShown ? -1 : 0}
      >
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
