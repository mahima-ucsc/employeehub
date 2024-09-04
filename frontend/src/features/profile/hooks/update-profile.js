import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useUpdateUser = () => {
  const { instance } = useAxios();

  const updateUser = ({ data, id }) => {
    return instance.patch(`employees/${id}`, data);
  };

  return useMutation({
    mutationFn: updateUser,
  });
};

export default useUpdateUser;
