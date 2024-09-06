import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useUpdateEmployeeById = () => {
  const { instance } = useAxios();

  const updateEmployeeById = ({ data, id }) => {
    return instance.patch(`employees/${id}`, data);
  };

  return useMutation({
    mutationFn: updateEmployeeById,
  });
};

export default useUpdateEmployeeById;
