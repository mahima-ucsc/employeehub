import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useGetEmployeeById = (userId) => {
  const { instance } = useAxios();

  const getUserById = async () => {
    const { data } = await instance.get(`employees/${userId}`);
    return data;
  };

  return useQuery({
    queryKey: ["employees", userId],
    queryFn: getUserById,
  });
};

export default useGetEmployeeById;
