import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useUpdateLeaveById = () => {
  const { instance } = useAxios();

  const updateLeaveById = ({ data, EmployeeId, LeaveId }) => {
    return instance.patch(`leaves/${EmployeeId}/${LeaveId}`, data);
  };

  return useMutation({
    mutationFn: updateLeaveById,
  });
};

export default useUpdateLeaveById;
