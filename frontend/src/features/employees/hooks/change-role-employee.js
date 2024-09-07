import { useMutation } from "@tanstack/react-query";
import { useAxios } from "../../../common/hooks";

const useChangeEmployeeRoleById = () => {
  const { instance } = useAxios();

  const changeEmployeeRoleById = ({ id, data }) => {
    return instance.patch(`employees/${id}/role`, data);
  };

  return useMutation({
    mutationFn: changeEmployeeRoleById,
  });
};

export default useChangeEmployeeRoleById;
