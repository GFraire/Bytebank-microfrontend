import React from "react";
import { createRoot } from "react-dom/client";
import App, { AppTransactionProps } from "./App";

const ROOT_ID = "#_transactions-dev-Root";

const rootEl = document.querySelector(ROOT_ID);

export default function Mount(props: AppTransactionProps) {
  return <App {...props} />;
}

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <App
      user={{ uid: "3", displayName: "Mock user", email: "mock.user@gmail.com" }}
    />
  );
}
