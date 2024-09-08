import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useGetMyLeaveById = (employeeId, leaveId) => {
  const { instance } = useAxios();

  const getMyLeaveById = async () => {
    const { data } = await instance.get(`leaves/${employeeId}/${leaveId}`);
    return data;
  };

  return useQuery({
    queryFn: getMyLeaveById,
    queryKey: ["leaves", employeeId, leaveId],
  });
};

export default useGetMyLeaveById;
