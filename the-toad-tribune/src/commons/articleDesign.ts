import styled from "styled-components";

export const ArticleContentContainer = styled.div`
  overflow: hidden;
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: left;
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
 font-family: "Times New Roman", Times, serif;

p::first-letter {
  font-size: 30px;
  margin: 0.9rem 0 ;
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
