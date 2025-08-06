import React from "react";
import { createRoot } from "react-dom/client";
import App, { AppTransactionProps } from "./App";

const ROOT_ID = "#_add-transaction-dev-Root";

const rootEl = document.querySelector(ROOT_ID);

export default function Mount(props: AppTransactionProps) {
  return <App {...props} />;
}

if (rootEl) {
  const root = createRoot(rootEl);
  root.render(
    <App
      user={{
        uid: "2",
        displayName: "Mock user",
        email: "mock.user@gmail.com",
      }}
    />
  );
}
