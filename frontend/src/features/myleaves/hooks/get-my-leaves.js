import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useGetMyLeaves = (id) => {
  const { instance } = useAxios();

  const geMyLeaves = async () => {
    const { data } = await instance.get(`leaves/${id}`);
    return data;
  };

  return useQuery({
    queryKey: ["myleaves"],
    queryFn: geMyLeaves,
  });
};

export default useGetMyLeaves;
