import { Link, useRouteError } from 'react-router-dom';
import styled from "styled-components";
import Notfound from './not-found';
import Somethingwentwrong from './something-went-wrong';

const Wrapper = styled.main`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: #64748b;
  }
  a {
    color: #2cb1bc;
    text-transform: capitalize;
  }
`;

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          < Notfound />
          <h3>Oops! page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to='/dashboard'>back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
      < Somethingwentwrong/>
        <h3>something went wrong</h3>
      </div>
    </Wrapper>
  );
};
export default Error;