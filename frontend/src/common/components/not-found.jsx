import styled from "styled-components";
import notfound from "../../assets/images/notfound.png";

const StyledImage = styled.img`
  width: 90vw;
  max-width: 600px;
  display: block;
  margin-bottom: 2rem;
  margin-top: -3rem;
`;

const Notfound = () => {
  return <StyledImage src={notfound} alt="not found" />;
};

export default Notfound;
