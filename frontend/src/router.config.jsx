/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import App from "./App";
import { useAuth } from "./common/hooks";
import Login from "./features/login";
import Register from "./features/register";
import { DashboardLayout } from "./common/components";
import { Error } from "./common/components";
import Profile from "./features/profile";
import { EmployeeList } from "./features/employees/pages";
import EmployeeEdit from "./features/employees/pages/employee-edit/employee-edit";

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
    errorElement: <Error />,
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
            element: <Profile />,
          },
          {
            path: "leaves",
            element: <h1>Leaves</h1>,
          },
          {
            path: "employees",
            element: <EmployeeList />,
          },
          {
            path: "employees/:userId/edit",
            element: <EmployeeEdit />,
          },
        ],
      },
    ],
  },
]);
