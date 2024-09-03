import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import { RegisterPageWrapper } from "../assets/wrappers";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, setupUser } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, isMember } = values;
    if (!email || !password || (!isMember && (!firstName || !lastName))) {
      displayAlert();
      return;
    }
    const currentUser = {
      firstname: firstName,
      lastname: lastName,
      email,
      password,
    };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "employee/register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    console.log("yo", user);
    if (user?.id) {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [user, navigate]);

  return (
    <RegisterPageWrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/* firstname input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="firstName"
            labelText="First Name"
            value={values.firstName}
            handleChange={handleChange}
          />
        )}

        {/* lastname input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            value={values.lastName}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </RegisterPageWrapper>
  );
};
export default Register;
