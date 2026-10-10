import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/global.css";
import "./styles/new.css";
import "./styles/grafana-host.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
