import styled from "styled-components";

export const ArticleContentContainer2 = styled.div`
  max-height: 90%;
  max-width: 90%;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 2px solid red;
`;

export const ImageContainer2 = styled.div`
  height: 8rem;
  width: 19rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
`;

export const HeaderContainer2 = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 0.2rem;

  h3 {
    margin: 0;
    text-align: center;
  }

  h4 {
    margin: .2rem 0 0 0;
  }
  h5 {
    margin: 0;
    border: 2px solid blue
  }
`;

export const ArticleDescriptionContainer2 = styled.div`
    p {
        margin: .4rem;
       font-family: 'Times New Roman', Times, serif;
    }
`;
