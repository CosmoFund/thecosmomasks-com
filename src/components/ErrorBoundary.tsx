import React from 'react';
import { ErrorComponent } from './ErrorComponent';



interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Record<string, unknown>, ErrorBoundaryState> {
  public constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      error: null,
    };
  }

  public componentDidCatch(error: Error) {
    this.setState({ error });
  }

  public render() {
    if (this.state.error) {
      return <ErrorComponent />;
    }
    return this.props.children;
  }
}
