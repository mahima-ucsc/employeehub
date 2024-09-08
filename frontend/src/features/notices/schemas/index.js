import * as yup from "yup";
export const noticeSchema = yup
  .object({
    title: yup.string().required("Please enter the title."),
    description: yup.string().required("Please enter the description."),
  })
  .required();
