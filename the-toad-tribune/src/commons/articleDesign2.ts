import styled from "styled-components";

export const ArticleContentContainer2 = styled.div`
  max-width: 98%;
  max-height: 98%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: scroll;

  @media only screen and (max-width: 599px) {
    max-width: 90%;
    max-height: 90%;
    margin-left: auto;
    margin-right: auto;
  }

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

  @media only screen and (max-width: 1199px) {
    max-width: 65%;
    height: 100%;
  }

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

  @media only screen and (max-width: 1199px) {
    padding: 5px;
  }

  @media only screen and (max-width: 599px) {
    width: 98%;
  }

  h3 {
    margin: 0.25rem;
    text-align: left;
    line-height: 1.5rem;
    font-family: 'Oswald', sans-serif;

    @media only screen and (max-width: 599px) {
      margin: 0 0 0 2rem;
    }
  }

  h4 {
    margin: 0.9rem 0 0 0.4rem;
    font-family: 'Rubik', sans-serif;

    @media only screen and (max-width: 599px) {
      margin: 2rem 0 0 3rem;
    }
  }
  h5 {
    margin: 0.2rem 0 0 0.4rem;
    font-family: 'Rubik', sans-serif;

    @media only screen and (max-width: 599px) {
      margin: 0 0 0 3rem;
    }
  }
`;

export const DescriptionContainer2 = styled.div`
  font-family: "Times New Roman", Times, serif;
  margin: 1rem;

  @media only screen and (max-width: 599px) {
    margin: 0 0 0 2rem;
  }

  p::first-letter {
    font-size: 30px;
    margin: 0.9rem 0;
  }
`;
