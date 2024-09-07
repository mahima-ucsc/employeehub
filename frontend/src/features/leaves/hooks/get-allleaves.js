import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useGetAllLeaves = () => {
  const { instance } = useAxios();

  const getLeaves = async () => {
    const { data } = await instance.get("leaves");
    return data;
  };

  return useQuery({
    queryKey: ["leaves"],
    queryFn: getLeaves,
  });
};

export default useGetAllLeaves;
