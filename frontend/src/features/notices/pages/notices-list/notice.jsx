import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../../common/hooks";

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
  .actions {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    padding: 0.5rem 1.5rem;
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

const Notice = ({ title, description, id }) => {
  const { user } = useAuth();
  const handleDelete = () => {};

  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </header>
      {user.role === "admin" ? (
        <footer className="actions">
          <Link to={`${id}/edit`} className="btn edit-btn">
            Edit
          </Link>
          <button
            type="button"
            className="btn delete-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </footer>
      ) : null}
    </Wrapper>
  );
};
export default Notice;
