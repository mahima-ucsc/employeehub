import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useLogin = () => {
  const { instance } = useAxios();

  const login = (data) => {
    return instance.post("login", data);
  };

  return useMutation({
    mutationFn: login,
  });
};

export default useLogin;
