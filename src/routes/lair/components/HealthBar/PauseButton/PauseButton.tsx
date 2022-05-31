import React from 'react';
import { useTypedSelector, useTypedDispatch } from 'redux/hooks';
import { pause } from 'redux/actions';
import classes from './PauseButton.scss';

import playIcon from 'assets/images/play.png';
import pauseIcon from 'assets/images/pause.png';

const PauseButton: React.FC = () => {
  const dispatch = useTypedDispatch();
  const isPause = useTypedSelector((state) => state.pause);
  return (
    <button className={classes.pause} onClick={() => dispatch(pause())}>
      <img src={isPause ? playIcon : pauseIcon} />
    </button>
  );
};

export { PauseButton };
