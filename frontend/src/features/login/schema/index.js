import * as yup from "yup";
export const loginSchema = yup
  .object({
    email: yup.string().email().required("Please enter your email address."),
    password: yup.string().required("Please enter your  password."),
  })
  .required();
