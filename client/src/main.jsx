import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppProviders from "./config/AppProviders";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);
