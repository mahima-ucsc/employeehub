import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDeleteMyLeaveById } from "../../hooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Wrapper = styled.article`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);
  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-100);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .info {
    h5 {
      margin-bottom: 0.5rem;
    }
    p {
      margin-bottom: 0.25rem;
      letter-spacing: var(--letter-spacing);
      color: var(--text-secondary-color);
    }
    p.description {
      margin-top: 1rem;
    }
  }
  .capitalized-text {
    text-transform: capitalize;
  }
  .status {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-weight: bold;
    text-transform: capitalize;
    color: white;
  }
  .pending {
    background-color: var(--primary-500);
  }
  .approved {
    background-color: green;
  }
  .rejected {
    background-color: red;
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

const Leave = ({
  leaveId,
  startDate,
  endDate,
  employeeId,
  description,
  status,
}) => {
  const { mutate: deleteMyLeaveById } = useDeleteMyLeaveById();
  const queryClient = useQueryClient();
  const statusClass = status;

  const handleDelete = () => {
    deleteMyLeaveById(
      { employeeId, leaveId },
      {
        onSuccess: () => {
          toast.success("Leave deleted successfully");
          queryClient.invalidateQueries("myleaves");
        },
        onError: (err) => {
          toast.error(err.response.data.msg);
        },
      }
    );
  };

  return (
    <Wrapper>
      <header>
        <div className="info">
          <p>{`Start Date: ${new Date(startDate).toDateString()}`}</p>
          <p>{`End Date: ${new Date(endDate).toDateString()}`}</p>
          <p className="description">{description}</p>
        </div>
        <div className={`status ${statusClass}`}>{status}</div>
      </header>
      <footer className="actions">
        <Link to={`${employeeId}/${leaveId}/edit`} className="btn edit-btn">
          Edit
        </Link>
        <button type="button" className="btn delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </footer>
    </Wrapper>
  );
};

export default Leave;
