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
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useUpdateNoticeById from "../../hooks/edit-notice";
import useGetNoticeById from "../../hooks/get-notice";

const Button = styled.button.attrs({
  className: "btn btn-block form-btn",
  type: "submit",
})``;

const NoticeEdit = () => {
  const { noticeId } = useParams();
  const { data: notice, isLoading } = useGetNoticeById(noticeId);
  const { mutate: updateNoticeById } = useUpdateNoticeById();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(noticeSchema),
    defaultValues: notice,
  });

  const onSubmit = (data) => {
    updateNoticeById(
      { data: data, id: notice.id },
      {
        onSuccess: () => {
          toast.success("Notice details updated successfully");
          navigate("../notices");
        },
        onError: (err) => {
          toast.error(err.response.data.msg);
        },
      }
    );
  };

  useEffect(() => {
    if (notice) {
      reset(notice);
    }
  }, [notice, reset]);

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

export default NoticeEdit;
