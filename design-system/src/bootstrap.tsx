import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

import "./global.css"

const ROOT_ID = "#_design-system-dev-Root";

const rootEl = document.querySelector(ROOT_ID);

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
