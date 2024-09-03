import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./main.css";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router.config";
import { Slide, ToastContainer } from "react-toastify";
// import App from "./App.jsx";
// import { AppProvider } from "./context/appContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AppProvider>
      <App />
    </AppProvider> */}
    <RouterProvider router={routerConfig} />
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      transition={Slide}
    />
  </StrictMode>
);
