import axios from "axios";
import useAuth from "./auth";
import { toast } from "react-toastify";

const useAxios = () => {
  const { user, logout } = useAuth();

  const instance = axios.create({
    baseURL: "http://localhost:3500/api/",
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response); // TODO: Remove this line in production
      if (error.response.status === 401) {
        toast.error("Please login again");
        logout();
      }
      return Promise.reject(error);
    }
  );

  return { instance };
};

export default useAxios;
