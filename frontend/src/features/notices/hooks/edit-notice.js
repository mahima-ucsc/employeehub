import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useUpdateNoticeById = () => {
  const { instance } = useAxios();

  const updateNoticeById = ({ data, id }) => {
    return instance.patch(`notices/${id}`, data);
  };

  return useMutation({
    mutationFn: updateNoticeById,
  });
};

export default useUpdateNoticeById;
