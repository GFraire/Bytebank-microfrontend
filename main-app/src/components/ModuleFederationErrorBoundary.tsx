import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  moduleName?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ModuleFederationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Module Federation Error in ${this.props.moduleName || 'unknown module'}:`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div 
          className="p-4 border border-red-300 rounded-md bg-red-50"
          role="alert"
          aria-live="assertive"
        >
          <h3 className="text-red-800 font-medium" id="error-title">
            Erro ao carregar módulo {this.props.moduleName}
          </h3>
          <p className="text-red-600 text-sm mt-1" aria-describedby="error-title">
            O módulo não pôde ser carregado. Tente recarregar a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            aria-label="Recarregar a página para tentar novamente"
            type="button"
          >
            Recarregar
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ModuleFederationErrorBoundary;