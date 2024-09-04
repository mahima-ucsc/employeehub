/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import App from "./App";
import { useAuth } from "./common/hooks";
import Login from "./features/login";
import Register from "./features/register";
import { DashboardLayout } from "./common/components";

// eslint-disable-next-line no-unused-vars
function ProtectedLayout() {
  const { user } = useAuth();

  if (user === null || user === "null") {
    return <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
}

function OnlyUnauthenticatedComponentWrapper({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
}

function OnlyAuthenticatedComponentWrapper({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace={true} />;
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
          <OnlyUnauthenticatedComponentWrapper>
            <Login />
          </OnlyUnauthenticatedComponentWrapper>
        ),
      },
      {
        path: "register",
        element: (
          <OnlyUnauthenticatedComponentWrapper>
            <Register />
          </OnlyUnauthenticatedComponentWrapper>
        ),
      },
      {
        path: "dashboard",
        // element: <ProtectedLayout />,
        element: (
          <OnlyAuthenticatedComponentWrapper>
            <DashboardLayout />
          </OnlyAuthenticatedComponentWrapper>
        ),
        children: [
          {
            index: true,
            element: <h1>Profile</h1>,
          },
          {
            path: "leaves",
            element: <h1>Leaves</h1>,
          },
          {
            path: "admin",
            element: <h1>Admin Page</h1>,
          },
        ],
      },
    ],
  },
]);
