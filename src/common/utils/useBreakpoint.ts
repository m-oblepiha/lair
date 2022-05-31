import { useLayoutEffect } from 'react';

const useBreakpoint = () => {
  const resizeListener = () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const root = document.querySelector('#app') as HTMLDivElement;

    const isMobile = window.innerWidth < 550;

    body.style.height = isMobile
      ? `${Math.max(window.innerHeight, 636) - 50}px`
      : '100vh';

    root.style.minHeight = isMobile
      ? `${Math.max(window.innerHeight, 636) - 50}px`
      : 'none';
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
