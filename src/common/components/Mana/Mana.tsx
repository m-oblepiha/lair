import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import classnames from 'classnames';
import classes from './Mana.scss';
import levelup from 'assets/images/levelup.png';

type Props = {
  extraClassname?: string;
};

const Mana: React.FC<Props> = ({ extraClassname }) => {
  const mana = useTypedSelector((state) => state.mana);
  return (
    <div className={classnames(classes.mana, extraClassname)}>
      <span className={classes.count}>{mana}</span>
      <img className={classes.icon} src={levelup} />
    </div>
  );
};

export { Mana };
