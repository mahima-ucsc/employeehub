import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useUpdateLeaveStatusById = () => {
  const { instance } = useAxios();

  const updateLeaveStatusById = ({ employeeId, leaveId, status }) => {
    return instance.patch(`leaves/${employeeId}/${leaveId}/${status}`);
  };

  return useMutation({
    mutationFn: updateLeaveStatusById,
  });
};

export default useUpdateLeaveStatusById;
