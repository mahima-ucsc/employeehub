import styled from "styled-components";
import Leave from "./leave";
import { useAuth } from "../../../../common/hooks";
import { useGetAllLeaves } from "../../hooks";

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
  @media (min-width: 1120px) {
    .leaves {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

const LeaveList = () => {
  const { data, isLoading } = useGetAllLeaves();
  const { user } = useAuth();

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
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>Leaves</h5>
      <div className="leaves">
        {data
          .filter((leave) => leave.employeeId !== user.id)
          .map((leave) => {
            return <Leave key={leave.leaveId} {...leave} />;
          })}
      </div>
    </Wrapper>
  );
};

export default LeaveList;
