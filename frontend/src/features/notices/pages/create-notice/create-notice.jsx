import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { noticeSchema } from "../../schemas";
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
import { useCreateNotice } from "../../hooks";
import { toast } from "react-toastify";

const Button = styled.button.attrs({
  className: "btn btn-block form-btn",
  type: "submit",
})``;

const CreateNotice = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { mutate: createNotice } = useCreateNotice();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(noticeSchema),
  });

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/dashboard/notices", { replace: true });
    }
  }, [user.role, navigate]);

  const onSubmit = (data) => {
    createNotice(data, {
      onSuccess: () => {
        toast.success("Notice was Created Successfully!");
        navigate("/dashboard/notices", { replace: true });
      },
      onError: (err) => {
        toast.error(err.response.data.msg);
      },
    });
  };

  return (
    <DashboardFormWrapper>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="form-title">Create Notice</h4>
        <div className="form-center">
          <FormRow>
            <Label htmlFor="title">Title</Label>
            <Input type="text" name="title" {...register("title")} />
            <FormErrorMsg>{errors.title?.message}</FormErrorMsg>
          </FormRow>
          <FormRow>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
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
export default CreateNotice;
