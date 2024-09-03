import styled from "styled-components";

export const Form = styled.form.attrs({
  className: "form",
})``;

export const Input = styled.input.attrs({
  className: "form-input",
})``;

export const Label = styled.label.attrs({
  className: "form-label",
})``;

export const FormRow = styled.div.attrs({
  className: "form-row",
})``;

export const FormErrorMsg = styled.span`
  height: 1.25rem;
  color: #ef4444;
  font-size: 0.875rem;
`;
