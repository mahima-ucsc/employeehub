import styled from "styled-components";
import somethingwentwrong from "../../assets/images/somethingwentwrong.png";

const StyledImage = styled.img`
  width: 90vw;
  max-width: 600px;
  display: block;
  margin-bottom: 2rem;
  margin-top: -3rem;
`;

const Somethingwentwrong = () => {
  return <StyledImage src={somethingwentwrong} alt="Something Went Wrong" />;
};

export default Somethingwentwrong;
