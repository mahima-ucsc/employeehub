import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useDeleteLeaveById = () => {
  const { instance } = useAxios();

  const deleteLeaveById = ({ employeeId, leaveId }) => {
    console.log(employeeId);
    console.log(leaveId);
    return instance.delete(`leaves/${employeeId}/${leaveId}`);
  };

  return useMutation({
    mutationFn: deleteLeaveById,
  });
};

export default useDeleteLeaveById;
