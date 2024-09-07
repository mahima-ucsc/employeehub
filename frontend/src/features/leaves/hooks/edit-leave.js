import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useUpdateLeaveById = () => {
  const { instance } = useAxios();

  const updateLeaveById = ({ data, employeeId, leaveId }) => {
    return instance.patch(`leaves/${employeeId}/${leaveId}`, data);
  };

  return useMutation({
    mutationFn: updateLeaveById,
  });
};

export default useUpdateLeaveById;
