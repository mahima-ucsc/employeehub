import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./main.css";
import App from "./App.jsx";
import { AppProvider } from "./context/appContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
