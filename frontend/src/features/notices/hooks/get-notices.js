import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useGetNotices = () => {
  const { instance } = useAxios();

  const getNotices = async () => {
    const { data } = await instance.get("notices");
    return data;
  };

  return useQuery({
    queryKey: ["notices"],
    queryFn: getNotices,
  });
};

export default useGetNotices;
