import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDeleteEmployeeById } from "../../hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    background: var(--primary-500);
    border-radius: var(--border-radius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: var(--white);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin: 0;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
  }
  .capitalized-text {
    text-transform: capitalize;
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    padding: 1.5rem;
  }
  .edit-btn,
  .delete-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .edit-btn {
    margin-right: 0.5rem;
  }
`;

const Employee = ({ firstName, lastName, role, email, id }) => {
  const { mutate: deleteEmployeeById } = useDeleteEmployeeById();
  const queryClient = useQueryClient();

  const handleDelete = () => {
    deleteEmployeeById(id, {
      onSuccess: () => {
        toast.success("Employee deleted successfully");
        queryClient.invalidateQueries("employees");
      },
      onError: (err) => {
        toast.error(err.response.data.msg);
      },
    });
  };
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{firstName.charAt(0)}</div>
        <div className="info">
          <h5>{`${firstName} ${lastName}`}</h5>
          <p>{email}</p>
          <p className="capitalized-text">{role}</p>
        </div>
      </header>
      <footer className="actions">
        <Link to={`${id}/edit`} className="btn edit-btn">
          Edit
        </Link>
        <button type="button" className="btn delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </footer>
    </Wrapper>
  );
};
export default Employee;
