import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useCreateNotice = () => {
  const { instance } = useAxios();

  const createNotice = (data) => {
    return instance.post("notices", data);
  };

  return useMutation({
    mutationFn: createNotice,
  });
};

export default useCreateNotice;
