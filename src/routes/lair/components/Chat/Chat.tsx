import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import classes from './Chat.scss';

const Chat: React.FC = () => {
  const messages = useTypedSelector((state) => state.records);

  return (
    <div className={classes.container}>
      {messages.map((message, index) => (
        <p className={classes.message} key={index}>
          {message}
        </p>
      ))}
    </div>
  );
};

export { Chat };
