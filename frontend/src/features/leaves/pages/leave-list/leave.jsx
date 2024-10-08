import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDeleteLeaveById, useUpdateLeaveStatusById } from "../../hooks";
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
  .delete-btn,
  .approve-btn,
  .reject-btn {
    height: 30px;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
  }
  .edit-btn,
  .approve-btn {
    margin-right: 0.5rem;
  }
  .approve-btn {
    margin-left: auto;
  }
  .rej {
    margin-left: auto;
  }
`;

const Leave = ({
  leaveId,
  startDate,
  endDate,
  employeeId,
  description,
  status,
  employeeName,
}) => {
  const { mutate: deleteLeaveById } = useDeleteLeaveById();
  const { mutate: changeLeaveStatus } = useUpdateLeaveStatusById();
  const queryClient = useQueryClient();

  const statusClass =
    status === "pending"
      ? "pending"
      : status === "approved"
      ? "approved"
      : "rejected";

  const handleDelete = () => {
    deleteLeaveById(
      { employeeId, leaveId },
      {
        onSuccess: () => {
          toast.success("Leave deleted successfully");
          queryClient.invalidateQueries("leaves");
        },
        onError: (err) => {
          toast.error(err.response.data.msg);
        },
      }
    );
  };
  const handleStatusChange = (status) => () => {
    changeLeaveStatus(
      { employeeId, leaveId, status },
      {
        onSuccess: () => {
          toast.success("Leave status updated successfully");
          queryClient.invalidateQueries("leaves");
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
          <p>{`Employee: ${employeeName}`}</p>
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
        {status === "pending" && (
          <>
            <button
              className="btn approve-btn"
              onClick={handleStatusChange("approved")}
            >
              Approve
            </button>
            <button
              className="btn reject-btn"
              onClick={handleStatusChange("rejected")}
            >
              Reject
            </button>
          </>
        )}

        {status === "rejected" && (
          <button
            className="btn approve-btn"
            onClick={handleStatusChange("approved")}
          >
            Approve
          </button>
        )}

        {status === "approved" && (
          <button
            className="btn reject-btn rej"
            onClick={handleStatusChange("rejected")}
          >
            Reject
          </button>
        )}
      </footer>
    </Wrapper>
  );
};

export default Leave;
