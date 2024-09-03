import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./main.css";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router.config";
import { ToastContainer } from "react-toastify";
// import App from "./App.jsx";
// import { AppProvider } from "./context/appContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AppProvider>
      <App />
    </AppProvider> */}
    <RouterProvider router={routerConfig} />
    <ToastContainer
      autoClose={3000}
      closeOnClick={false}
      closeButton={false}
      hideProgressBar
      position="bottom-center"
    />
  </StrictMode>
);
