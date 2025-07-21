import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/globals.css";

const ROOT_ID = "#_transactions-dev-Root";

const rootEl = document.querySelector(ROOT_ID);

export default () => <App />;

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
