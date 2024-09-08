import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useUpdateMyLeaveById = () => {
  const { instance } = useAxios();

  const updateMyLeaveById = ({ data, employeeId, leaveId }) => {
    return instance.patch(`leaves/${employeeId}/${leaveId}`, data);
  };

  return useMutation({
    mutationFn: updateMyLeaveById,
  });
};

export default useUpdateMyLeaveById;
