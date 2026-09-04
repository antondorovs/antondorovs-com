import { Component } from 'react';

export function LoadingIndicator() {
  return <p className="load-state" role="status" aria-live="polite">Loading…</p>;
}

export class LoadErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() { return { failed: true }; }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="load-state" role="alert">
        <p>Could not load this page. Check your connection and try again.</p>
        <button type="button" onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }
}
