import { useNavigate, useParams } from "react-router-dom";
import { useGetLeaveById, useUpdateLeaveById } from "../../hooks";
import {
  DashboardFormWrapper,
  FormErrorMsg,
  FormRow,
  Input,
  Label,
} from "../../../../common/components";
import styled from "styled-components";
import { leaveUpdateSchema } from "../../schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { convertDateStringToYYYYMMDD } from "../../../../common/utils";

const Button = styled.button.attrs({
  className: "btn btn-block form-btn",
  type: "submit",
})``;

const LeaveEdit = () => {
  const { userId, leaveId } = useParams();
  const { data: leave, isLoading } = useGetLeaveById(userId, leaveId);
  const { mutate: updateLeaveById } = useUpdateLeaveById();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(leaveUpdateSchema),
    defaultValues: leave,
  });

  const onSubmit = (data) => {
    updateLeaveById(
      { data: data, employeeId : userId, leaveId },
      {
        onSuccess: () => {
          toast.success("Leave details updated successfully");
          navigate("../leaves");
        },
        onError: (err) => {
          toast.error(err.response.data.msg);
        },
      }
    );
  };

  useEffect(() => {
    if (leave) {
      reset({
        startDate : convertDateStringToYYYYMMDD(leave.startDate),
        endDate: convertDateStringToYYYYMMDD(leave.endDate),
        description: leave.description
      });
    }
  }, [leave, reset]);

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
        <h4 className="form-title">Leave Details</h4>
        <div className="form-center">
          <FormRow>
            <Label htmlFor="startDate">Start Date</Label>
            <Input type="Date" name="startDate" {...register("startDate")} />
            <FormErrorMsg>{errors.startDate?.message}</FormErrorMsg>
          </FormRow>
          <FormRow>
            <Label htmlFor="endDate">EndDate</Label>
            <Input type="Date" name="endDate" {...register("endDate")} />
            <FormErrorMsg>{errors.endDate?.message}</FormErrorMsg>
          </FormRow>
          <FormRow>
            <Label htmlFor="Description">Description</Label>
            <Input
              type="Text"
              name="Description"
              {...register("description")}
            />
            <FormErrorMsg>{errors.description?.message}</FormErrorMsg>
          </FormRow>
          <Button>Submit</Button>
        </div>
      </form>
    </DashboardFormWrapper>
  );
};

export default LeaveEdit;
