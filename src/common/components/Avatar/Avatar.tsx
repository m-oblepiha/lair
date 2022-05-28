import React from 'react';
import classnames from 'classnames';
import classes from './Avatar.scss';
import { avatars, type Avatar as AvatarType } from 'assets/images/avatars';

type Props = { avatar: AvatarType; extraClassname?: string };

const Avatar: React.FC<Props> = ({ avatar, extraClassname }) => (
  <img
    className={classnames(classes.avatar, extraClassname)}
    src={avatars[avatar]}
  />
);

export { Avatar };
