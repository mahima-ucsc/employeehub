import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormErrorMsg,
  FormRow,
  Input,
  Label,
  Logo,
  RegisterAndLoginWrapper,
} from "../../common/components";
import { toast } from "react-toastify";
import { useAuth } from "../../common/hooks";
import { registerSchema } from "./schema";
import { useRegister } from "./hooks";

const Button = styled.button.attrs({
  className: "btn btn-block form-btn",
  type: "submit",
})``;

const Register = () => {
  const { mutate: proceedRegister } = useRegister();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data) => {
    proceedRegister(data, {
      onSuccess: ({ data: user }) => {
        login(user);
        toast.success("Registered successfully!");
      },
      onError: (err) => {
        toast.error(err.response.data.msg);
      },
    });
  };
  return (
    <RegisterAndLoginWrapper>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <Logo />
        <h4>Register</h4>

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
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" {...register("password")} />
          <FormErrorMsg>{errors.password?.message}</FormErrorMsg>
        </FormRow>
        <Button>Submit</Button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </RegisterAndLoginWrapper>
  );
};
export default Register;
