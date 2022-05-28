import React from 'react';
import classnames from 'classnames';
import classes from './PetIcon.scss';

type Props = { extraClassname?: string; src: string };

const PetIcon: React.FC<Props> = ({ src, extraClassname }) => (
  <img src={src} className={classnames(classes.icon, extraClassname)} />
);

export { PetIcon };
