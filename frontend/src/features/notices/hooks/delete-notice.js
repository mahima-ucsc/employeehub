import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks"; // Custom hook for Axios instance

const useDeleteNoticeById = () => {
  const { instance } = useAxios();

  const deleteNoticeById = (id) => {
    return instance.delete(`notices/${id}`); // Send delete request
  };

  return useMutation({
    mutationFn: deleteNoticeById,
  });
};

export default useDeleteNoticeById;
