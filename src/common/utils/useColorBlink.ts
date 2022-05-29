import React, { useEffect, useState, useRef } from 'react';
import classes from 'common/styles/_colors.scss';

type Args = {
  ref: React.RefObject<HTMLElement>;
  value: number;
  reverse?: boolean;
};

const useColorBlink = ({ ref, value, reverse }: Args) => {
  const isFirstRender = useRef<boolean>(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (isFirstRender.current) return;
    if (timer.current) clearTimeout(timer.current);

    const shift = {
      good: reverse ? classes.bad : classes.good,
      bad: reverse ? classes.good : classes.bad,
    };

    const classname = value > prevValue ? shift.good : shift.bad;
    const another = value > prevValue ? shift.bad : shift.good;

    setPrevValue(value);

    ref.current?.classList.remove(another);
    ref.current?.classList.add(classname);

    timer.current = setTimeout(
      () => ref.current?.classList.remove(classname),
      500
    );
  }, [value]);

  useEffect(() => {
    isFirstRender.current = false;
  }, []);
};

export { useColorBlink };
