import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useCreateLeave = () => {
  const { instance } = useAxios();

  const createLeave = async ({ userId, data }) => {
    return await instance.post(`leaves/${userId}`, data);
  };

  return useMutation({
    mutationFn: createLeave,
  });
};

export default useCreateLeave;
