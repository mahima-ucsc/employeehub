import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useDeleteMyLeaveById = () => {
  const { instance } = useAxios();

  const deleteMyLeaveById = ({ employeeId, leaveId }) => {
    return instance.delete(`leaves/${employeeId}/${leaveId}`);
  };

  return useMutation({
    mutationFn: deleteMyLeaveById,
  });
};

export default useDeleteMyLeaveById;
