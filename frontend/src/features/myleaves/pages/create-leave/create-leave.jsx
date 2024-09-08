import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { leaveCreateSchema } from "../../schema";
import {
  DashboardFormWrapper,
  FormErrorMsg,
  FormRow,
  Input,
  Label,
} from "../../../../common/components";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../common/hooks";
import { useCreateLeave } from "../../hooks";
import { toast } from "react-toastify";

const Button = styled.button.attrs({
  className: "btn btn-block form-btn",
  type: "submit",
})``;

const CreateLeave = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate: createLeave } = useCreateLeave();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(leaveCreateSchema),
  });

  const onSubmit = (data) => {
    createLeave({userId: user.id , data: data}, {
      onSuccess: () => {
        toast.success("Leave was Created Successfully!");
        navigate("/dashboard/myleaves", { replace: true });
      },
      onError: (err) => {
        toast.error(err.response.data.msg);
      },
    });
  };

  return (
    <DashboardFormWrapper>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="form-title">Create Leave</h4>
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
export default CreateLeave;
