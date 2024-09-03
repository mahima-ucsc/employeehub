import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useRegister = () => {
  const { instance } = useAxios();

  const login = (data) => {
    return instance.post("employees/register", data);
  };

  return useMutation({
    mutationFn: login,
  });
};

export default useRegister;
