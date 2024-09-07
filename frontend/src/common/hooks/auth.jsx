import React, { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "./logout";
import { toast } from "react-toastify";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const { mutate: fetchLogout } = useLogout();
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const navigate = useNavigate();

  const login = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  const logout = () => {
    fetchLogout(
      {},
      {
        onSuccess: () => {
          localStorage.removeItem("user");
          setUser(null);
          navigate("/login", { replace: true });
        },
        onError: (err) => {
          toast.error(err.response.data.msg);
        },
      }
    );
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export default useAuth;
