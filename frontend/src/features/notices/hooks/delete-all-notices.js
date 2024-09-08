import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useCleanNoticeBoard = () => {
  const { instance } = useAxios();

  const deleteAllNotices = () => {
    return instance.delete("notices");
  };

  return useMutation({
    mutationFn: deleteAllNotices,
  });
};

export default useCleanNoticeBoard;
