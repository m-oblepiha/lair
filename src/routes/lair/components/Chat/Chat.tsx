import React from 'react';
import { useTypedSelector } from 'redux/hooks';
import { Message } from './Message/Message';
import classes from './Chat.scss';

const Chat: React.FC = () => {
  const records = useTypedSelector((state) => state.records);
  const hearts = useTypedSelector((state) => state.hearts);

  return (
    <div className={classes.container}>
      {hearts === 0 && <p className={classes.gg}>{'Ваше сердце разбито.'}</p>}
      {records.map((record, index) => (
        <Message {...record} key={index} />
      ))}
    </div>
  );
};

export { Chat };
