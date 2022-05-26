import React from 'react';
import { Fallback } from './Fallback/Fallback';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError = () => ({ hasError: true });

  render = () => {
    if (this.state.hasError) return <Fallback />;
    return this.props.children;
  };
}

export { ErrorBoundary };
