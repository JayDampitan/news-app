import styled from "styled-components";

export const ArticleContentContainer = styled.div`
  max-height: 90%;
  max-width: 90%;
  margin: 1rem 0.5rem;
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0;
`;
export const TitleContainer = styled.div`
  margin-left: 0.5rem;
  margin-top: 0;
  h3 {
    margin: 0;
  }
`;

export const AuthorContainer = styled.div`
  h4 {
    margin: 0;
  }
`;

export const PublishedAtContainer = styled.div`
  h5 {
    margin: 0;
  }
`;

export const ArticleDescriptionContainer = styled.div`
  margin-top: 1rem;
  p {
    margin: 0;
    font-family: 'Times New Roman', Times, serif;
  }
`;

export const ImageContainer = styled.div`
  height: 8rem;
  width: 19rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
`;
