import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useGetEmployees = () => {
  const { instance } = useAxios();

  const getUsers = async () => {
    const { data } = await instance.get("employees");
    return data;
  };

  return useQuery({
    queryKey: ["employees"],
    queryFn: getUsers,
  });
};

export default useGetEmployees;
