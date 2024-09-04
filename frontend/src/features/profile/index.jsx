import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormErrorMsg, FormRow, Input, Label } from "../../common/components";
import { toast } from "react-toastify";
import { useAuth } from "../../common/hooks";
import DashboardFormWrapper from "../../common/components/dashboard-form-wrapper";
import { useUpdateUser } from "./hooks";
import { userUpdateSchema } from "./schema";

const Button = styled.button.attrs({
  className: "btn btn-block form-btn",
  type: "submit",
})``;

const Profile = () => {
  const { mutate: updateUser } = useUpdateUser();
  const { login } = useAuth();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(userUpdateSchema),
    defaultValues: user,
  });

  const onSubmit = (data) => {
    updateUser(
      { data: data, id: user.id },
      {
        onSuccess: ({ data: user }) => {
          login(user);
          toast.success("Profile details updated successfully");
        },
        onError: (err) => {
          toast.error(err.response.data.msg);
        },
      }
    );
  };
  return (
    <DashboardFormWrapper>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h4 className="form-title">Profile</h4>
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
          <FormRow>
            <Label htmlFor="password">New Password</Label>
            <Input type="password" name="password" {...register("password")} />
            <FormErrorMsg>{errors.password?.message}</FormErrorMsg>
          </FormRow>
          <Button>Submit</Button>
        </div>
      </form>
    </DashboardFormWrapper>
  );
};
export default Profile;
