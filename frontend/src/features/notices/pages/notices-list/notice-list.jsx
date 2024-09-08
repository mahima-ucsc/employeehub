import styled from "styled-components";
import { useGetNotices } from "../../hooks";
import Notice from "./notice";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .notices {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .notices {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

const NoticeList = () => {
  const { data, isLoading } = useGetNotices();

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
        <h2>No Notice</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>Notice</h5>
      <div className="notices">
        {data.map((notice) => {
          return <Notice key={notice.id} {...notice} />;
        })}
      </div>
    </Wrapper>
  );
};

export default NoticeList;
