import { createRoot } from "react-dom/client";

import React from "react";
import App from "./App";

const ROOT_ID = "#_sidebar-dev-Root";

const rootEl = document.querySelector(ROOT_ID);

export default (props: any) => <App {...props} />;

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App />);
}
