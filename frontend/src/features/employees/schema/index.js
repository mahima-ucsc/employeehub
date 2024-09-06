import * as yup from "yup";
export const employeeUpdateSchema = yup
  .object({
    firstName: yup.string().required("Please enter employee's first name."),
    lastName: yup.string().required("Please enter employee's last name."),
    email: yup
      .string()
      .email()
      .required("Please enter employee's email address."),
  })
  .required();
