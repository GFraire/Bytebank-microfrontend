import React from "react";
import { createRoot } from "react-dom/client";
import App, { AppProps } from "./App";

const ROOT_ID = "#_profile-dev-Root";

const rootEl = document.querySelector(ROOT_ID);

export default function Mount(props: AppProps) {
  return <App {...props} />;
}

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(<App user={null} />);
}
