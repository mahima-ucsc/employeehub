import styled from "styled-components";
import Employee from "./employee";
import { useAuth } from "../../../../common/hooks";
import { useGetEmployees } from "../../hooks";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .employees {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .employees {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

const EmployeeList = () => {
  const { data, isLoading } = useGetEmployees();
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
        <h2>No employees to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>Employees</h5>
      <div className="employees">
        {data
          .filter((emp) => emp.id !== user.id)
          .map((employee) => {
            return <Employee key={employee.id} {...employee} />;
          })}
      </div>
    </Wrapper>
  );
};

export default EmployeeList;
