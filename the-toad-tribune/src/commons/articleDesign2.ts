import styled from "styled-components";

export const ArticleContentContainer2 = styled.div`
  max-width: 98%;
  max-height: 98%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: scroll;

  h3 {
    margin: 0 0 1rem 0;
  }

  ::-webkit-scrollbar {
    display: none;
    width: 0;
  }
`;

export const ImageContainer2 = styled.div`
  max-width: 90%;
  max-height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    border: 1px solid black;
  }
`;

export const HeaderContainer2 = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 0.2rem;

  h3 {
    margin: 0.5rem;
    text-align: center;
    line-height: 1.5rem;
    font-family: 'Oswald', sans-serif;
  }

  h4 {
    margin: 0.9rem 0 0 0.4rem;
    font-family: 'Rubik', sans-serif;
  }
  h5 {
    margin: 0.2rem 0 0 0.4rem;
    font-family: 'Rubik', sans-serif;
  }
`;

export const DescriptionContainer2 = styled.div`
  font-family: "Times New Roman", Times, serif;

  p::first-letter {
    font-size: 30px;
    margin: 0.9rem 0;
  }
`;
