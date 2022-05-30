import React, { useReducer, useEffect, useRef } from 'react';
import { useTypedDispatch } from 'redux/hooks';
import {
  Chat,
  HealthBar,
  PetList,
  PetScreen,
  SummonButton,
  TimeBar,
} from './components';
import classnames from 'classnames';
import { next } from 'redux/thunks';
import classes from './LairRoute.scss';

const LairRoute: React.FC = () => {
  const dispatch = useTypedDispatch();

  const [isPetScreenShown, setIsPetScreenShown] = useReducer(
    (state: boolean) => !state,
    false
  );
  const controller = useRef<AbortController | null>(null);

  useEffect(() => {
    const timer = setInterval(
      () => (controller.current = dispatch(next())),
      2000
    );
    return () => {
      clearInterval(timer);
      if (controller.current) controller.current.abort();
    };
  }, []);

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
