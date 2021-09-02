import styled from "styled-components";

export const ArticleContentContainer2 = styled.div`
  max-width: 92%;
  max-height: 92%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`;

export const ImageContainer2 = styled.div`
  width: 14rem;

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
    margin: 0.2rem 0 0 0.4rem;
  }
  h5 {
    margin: 0.2rem 0 0 0.4rem;
  }
`;

export const DescriptionContainer2 = styled.div`
    font-family: "Times New Roman", Times, serif;

  p::first-letter{
    font-size: 30px;
    margin: 0.9rem 0 ;     
  }
`;
