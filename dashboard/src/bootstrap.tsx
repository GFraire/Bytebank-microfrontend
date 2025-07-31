import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const ROOT_ID = '#_dashboard-dev-Root';

const rootEl = document.querySelector(ROOT_ID);

// Exportamos uma função nomeada em vez de uma arrow function anônima
export default function Mount() {
  return <App />;
}

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}