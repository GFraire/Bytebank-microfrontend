import React from "react";
import { createRoot } from "react-dom/client";
import App, { AppDashboardProps } from "./App";

const ROOT_ID = "#_dashboard-dev-Root";

const rootEl = document.querySelector(ROOT_ID);

// Exportamos uma função nomeada em vez de uma arrow function anônima
export default function Mount(props: AppDashboardProps) {
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
