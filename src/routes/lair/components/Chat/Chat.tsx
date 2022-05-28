import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import classes from './Chat.scss';

const Chat: React.FC = () => {
  const messages = useTypedSelector((state) => state.records);
  const hearts = useTypedSelector((state) => state.hearts);

  return (
    <div className={classes.container}>
      {hearts === 0 && <p className={classes.gg}>{'Ваше сердце разбито.'}</p>}
      {messages.map((message, index) => (
        <p className={classes.message} key={index}>
          {message}
        </p>
      ))}
    </div>
  );
};

export { Chat };
