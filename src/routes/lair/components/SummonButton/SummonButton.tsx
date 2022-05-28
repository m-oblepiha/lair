import React from 'react';
import { useTypedDispatch, useTypedSelector } from 'redux/hooks';
import { summon } from 'redux/actions';
import classnames from 'classnames';
import classes from './SummonButton.scss';

type Props = {
  extraClassname?: string;
};

const SummonButton: React.FC<Props> = ({ extraClassname }) => {
  const dispatch = useTypedDispatch();

  const petsCount = useTypedSelector((state) => state.pets.length);
  const hearts = useTypedSelector((state) => state.hearts);
  const handleClick = () => dispatch(summon());

  return (
    <button
      className={classnames(classes.button, extraClassname)}
      disabled={petsCount === 4 || hearts === 0}
      onClick={handleClick}
    >
      {'ПРИЗВАТЬ'}
    </button>
  );
};

export { SummonButton };
