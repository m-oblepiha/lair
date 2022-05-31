import { useLayoutEffect } from 'react';

const useBreakpoint = () => {
  const resizeListener = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const body = document.querySelector('body') as HTMLElement;

    const isFit = window.innerHeight > 648 && window.innerWidth < 560;

    body.style.overflow = isFit ? 'hidden' : 'auto';
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', resizeListener);
    resizeListener();
    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, []);
};

export { useBreakpoint };
