import { useParams } from "react-router-dom";
import { useGetEmployeeById, useUpdateEmployeeById } from "../../hooks";
import {
  DashboardFormWrapper,
  FormErrorMsg,
  FormRow,
  Input,
  Label,
} from "../../../../common/components";
import styled from "styled-components";
import { employeeUpdateSchema } from "../../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Button = styled.button.attrs({
  className: "btn btn-block form-btn",
  type: "submit",
})``;

const EmployeeEdit = () => {
  const { userId } = useParams();
  const { data: employee, isLoading } = useGetEmployeeById(userId);
  const { mutate: updateEmployeeById } = useUpdateEmployeeById();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(employeeUpdateSchema),
    defaultValues: employee,
  });

  const onSubmit = (data) => {
    updateEmployeeById(
      { data: data, id: employee.id },
      {
        onSuccess: () => {
          toast.success("Employee details updated successfully");
        },
        onError: (err) => {
          toast.error(err.response.data.msg);
        },
      }
    );
  };

  useEffect(() => {
    if (employee) {
      reset(employee);
    }
  }, [employee, reset]);

  if (isLoading) {
    return (
      <DashboardFormWrapper>
        <h1>Loading...</h1>
      </DashboardFormWrapper>
    );
  }

  return (
    <DashboardFormWrapper>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="form-title">Employee Details</h4>
        <div className="form-center">
          <FormRow>
            <Label htmlFor="firstName">First Name</Label>
            <Input type="text" name="firstName" {...register("firstName")} />
            <FormErrorMsg>{errors.firstName?.message}</FormErrorMsg>
          </FormRow>
          <FormRow>
            <Label htmlFor="lastName">Last Name</Label>
            <Input type="text" name="lastName" {...register("lastName")} />
            <FormErrorMsg>{errors.lastName?.message}</FormErrorMsg>
          </FormRow>
          <FormRow>
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" {...register("email")} />
            <FormErrorMsg>{errors.email?.message}</FormErrorMsg>
          </FormRow>
          <Button>Submit</Button>
        </div>
      </form>
    </DashboardFormWrapper>
  );
};

export default EmployeeEdit;
