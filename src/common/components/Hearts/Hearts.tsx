import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import classnames from 'classnames';
import classes from './Hearts.scss';
import { heart } from 'assets/images/stats';

type Props = {
  extraClassname?: string;
};

const Hearts: React.FC<Props> = ({ extraClassname }) => {
  const hearts = useTypedSelector((state) => state.hearts);
  return (
    <div className={classnames(classes.hearts, extraClassname)}>
      <span className={classes.count}>{hearts}</span>
      <img className={classes.icon} src={heart} />
    </div>
  );
};

export { Hearts };
