import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useDeleteEmployeeById = () => {
  const { instance } = useAxios();

  const deleteEmployeeById = (id) => {
    return instance.delete(`employees/${id}`);
  };

  return useMutation({
    mutationFn: deleteEmployeeById,
  });
};

export default useDeleteEmployeeById;
