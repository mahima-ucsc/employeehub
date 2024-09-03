import * as yup from "yup";
export const registerSchema = yup
  .object({
    firstName: yup.string().required("Please enter your first name."),
    lastName: yup.string().required("Please enter your last name."),
    email: yup.string().email().required("Please enter an password."),
    password: yup.string().required("Please enter your email address."),
  })
  .required();
