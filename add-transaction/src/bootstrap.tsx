import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const ROOT_ID = '#_add-transaction-dev-Root';

const rootEl = document.querySelector(ROOT_ID);

export default () => <App />;

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}