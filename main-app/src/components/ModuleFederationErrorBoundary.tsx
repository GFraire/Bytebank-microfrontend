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
        <div className="p-4 border border-red-300 rounded-md bg-red-50">
          <h3 className="text-red-800 font-medium">
            Erro ao carregar módulo {this.props.moduleName}
          </h3>
          <p className="text-red-600 text-sm mt-1">
            O módulo não pôde ser carregado. Tente recarregar a página.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ModuleFederationErrorBoundary;