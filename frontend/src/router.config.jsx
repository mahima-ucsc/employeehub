/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import App from "./App";
import { useAuth } from "./common/hooks";
import Login from "./features/login";

function ProtectedLayout() {
  const { user } = useAuth();

  if (user === null || user === "null") {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}

function OnlyIfUnauthenticatedWrapper({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: "true",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "login",
        element: (
          <OnlyIfUnauthenticatedWrapper>
            <Login />
          </OnlyIfUnauthenticatedWrapper>
        ),
      },
      {
        path: "dashboard",
        element: <ProtectedLayout />,
        children: [
          {
            index: true,
            element: <h1>Dashboard</h1>,
          },
        ],
      },
    ],
  },
]);
