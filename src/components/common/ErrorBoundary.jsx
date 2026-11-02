import React, { lazy, Suspense } from 'react';

// Lazy load ErrorPage so it does not block the initial application load
const ErrorPage = lazy(() => import('../../pages/ErrorPage'));

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback 500 error UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and log incident telemetry
    this.setState({ errorInfo });
    console.error('[Aksara Tech Incident Monitor] Unhandled Runtime Exception:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Automatically render the HTTP 500 Internal Server Error screen
      return (
        <Suspense fallback={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0F172A', color: '#FFFFFF', padding: '24px' }}>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px' }}>Mengisolasi Insiden Sistem (HTTP 500)</h2>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>Memuat modul diagnostik teknis Aksara Tech...</p>
            </div>
          </div>
        }>
          <ErrorPage 
            defaultCode={500} 
            customError={this.state.error}
            onReset={this.handleReset}
          />
        </Suspense>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
