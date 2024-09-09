import styled from "styled-components";
import { useAuth } from "../../../../common/hooks";
import { useGetMyLeaves } from "../../hooks";
import Leave from "./my-leave";
import { Link } from "react-router-dom";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .leaves {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  .btn-container {
    display: flex;            
    justify-content: flex-end; 
    margin-bottom: 1rem;
  }
  .create-btn,
  .clean-btn {
    padding: 0.5rem;
  }
  .create-btn {
    margin-right: 0.5rem;
  }
  @media (min-width: 1120px) {
    .leaves {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

const MyLeaveList = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetMyLeaves(user.id);

  if (isLoading) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  if (data.length === 0) {
    return (
      <Wrapper>
        <h2>No Leaves to display...</h2>
        <div className="btn-container">
          <Link to={"create"} className="btn create-btn">
            Create
          </Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>My Leaves</h5>
      <div className="btn-container">
          <Link to={"create"} className="btn create-btn">
            Create
          </Link>
      </div>
      <div className="leaves">
        {data.map((leave) => {
          return <Leave key={leave.leaveId} {...leave} />;
        })}
      </div>
    </Wrapper>
  );
};

export default MyLeaveList;
