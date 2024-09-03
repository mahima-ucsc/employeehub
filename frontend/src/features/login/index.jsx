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
} from "../../common/components";
import { useLogin } from "./hooks";
import { toast } from "react-toastify";
import { useAuth } from "../../common/hooks";
import { loginSchema } from "./schema";

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
`;

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
    });
  };
  return (
    <Wrapper>
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
    </Wrapper>
  );
};
export default Login;
