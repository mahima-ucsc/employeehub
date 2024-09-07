import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useLogout = () => {
  const logout = () => {
    return axios({
      method: "get",
      url: "http://localhost:3500/api/logout",
      withCredentials: true,
    });
  };

  return useMutation({
    mutationFn: logout,
  });
};

export default useLogout;
