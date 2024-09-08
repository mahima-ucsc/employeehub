import { useQuery } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useGetNoticeById = (noticeId) => {
  const { instance } = useAxios();

  const getNoticeById = async () => {
    const { data } = await instance.get(`notices/${noticeId}`);
    return data;
  };

  return useQuery({
    queryKey: ["notices", noticeId],
    queryFn: getNoticeById,
  });
};

export default useGetNoticeById;
