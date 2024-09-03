import { Link, Form } from "react-router-dom";
import styled from "styled-components";
import { FormRow, Logo } from "../../common/components";
import { useState } from "react";
import { useLogin } from "./hooks";
import { toast } from "react-toastify";

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

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [values, setValues] = useState(initialState);
  const { mutate: proceedLogin } = useLogin();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    proceedLogin(values, {
      onSuccess: (result) => {
        console.log(result);
        toast.success("Login successfully!");
      },
      onError: (err) => {
        console.log(err);
        console.log("yo");
        toast.error("Please check email and password again!");
      },
    });
  };
  return (
    <Wrapper>
      <Form className="form">
        <Logo />
        <h4>login</h4>
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button
          type="button"
          className={`btn btn-block form-btn`}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;
