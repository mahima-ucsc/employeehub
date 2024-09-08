import styled from "styled-components";
import { useGetNotices } from "../../hooks";
import Notice from "./notice";
import { useAuth } from "../../../../common/hooks";
import { Link } from "react-router-dom";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h4 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .header {
    display: flex;
    margin-bottom: 1.5rem;
    align-items: center;
  }
  .notices {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  .btn-container {
    margin-left: auto;
  }
  .create-btn,
  .clean-btn {
    padding: 0.5rem;
  }
  .create-btn {
    margin-right: 0.5rem;
  }
  @media (min-width: 1120px) {
    .notices {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

const Header = () => {
  const { user } = useAuth();
  const handleCleanNoticeBoard = () => {};
  return (
    <div className="header">
      <h3>Notice Board</h3>
      {user.role === "admin" ? (
        <div className="btn-container">
          <Link to={"create"} className="btn create-btn">
            Create
          </Link>
          <button className="btn clean-btn" onClick={handleCleanNoticeBoard}>
            Clean Notice Board
          </button>
        </div>
      ) : null}
    </div>
  );
};

const NoticeList = () => {
  const { data, isLoading } = useGetNotices();

  if (isLoading) {
    return (
      <Wrapper>
        <Header />
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  if (data.length === 0) {
    return (
      <Wrapper>
        <Header />
        <h5>Empty</h5>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Header />
      <div className="notices">
        {data.map((notice) => {
          return <Notice key={notice.id} {...notice} />;
        })}
      </div>
    </Wrapper>
  );
};

export default NoticeList;
