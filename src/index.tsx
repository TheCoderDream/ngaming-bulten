import { createRoot } from "react-dom/client";

import { App } from "./app/App";
import { Providers } from "./app/providers";

import "@/styles/globals.scss";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element not found");
}

createRoot(rootEl).render(
  <Providers>
    <App />
  </Providers>,
);
