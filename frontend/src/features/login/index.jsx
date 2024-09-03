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
import { useLogin } from "./hooks";
import { toast } from "react-toastify";
import { useAuth } from "../../common/hooks";
import { loginSchema } from "./schema";

const Button = styled.button.attrs({
  className: "btn btn-block form-btn",
  type: "submit",
})``;

const Login = () => {
  const { mutate: proceedLogin } = useLogin();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    proceedLogin(data, {
      onSuccess: ({ data: user }) => {
        login(user);
        toast.success("Logged in successfully!");
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
        <h4>login</h4>

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
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </form>
    </RegisterAndLoginWrapper>
  );
};
export default Login;
