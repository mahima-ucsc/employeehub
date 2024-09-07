import * as yup from "yup";
export const leaveUpdateSchema = yup
  .object({
    startDate: yup.date().required("Please enter start date."),
    endDate: yup.date().required("Please enter end date."),
    description: yup.string().required("Please enter description."),
  })
  .required();
