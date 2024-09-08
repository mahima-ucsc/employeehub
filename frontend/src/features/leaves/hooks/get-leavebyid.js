import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useGetLeaveById = (employeeId, leaveId) => {
  const { instance } = useAxios();

  const getLeaveById = async () => {
    const { data } = await instance.get(`leaves/${employeeId}/${leaveId}`);
    return data;
  };

  return useQuery({
    queryFn: getLeaveById,
    queryKey: ["leaves", employeeId, leaveId],
  });
};

export default useGetLeaveById;
