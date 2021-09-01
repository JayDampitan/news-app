import styled from "styled-components";
import type { NewsProps } from "../api";
import { usePagination } from "../hooks";
import { Buttons } from "../commons";

import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";

const Movies: React.FC<NewsProps> = ({
  articleResponse,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <MoviesStyles>
      <Buttons
        onClick={() => {
          pageNumber === 0
            ? startEnd(articleResponse.articles.length - 1)
            : onPrevButton();
        }}
      >
        <img src={PrevIcon} alt="" />
      </Buttons>

      <MovieContentConatiner
        onClick={() => {
          renderMoreInfoPage();
          setSelectedArticle(article);
        }}
      >
        <MovieContentHeader>
          <MovieImageContainer>
            <img src={article?.urlToImage} />
          </MovieImageContainer>

          <MovieTitleAuthorContainer>
            <h3> {article?.title} </h3>
            <h4>{article?.author}</h4>
            <h5>{article?.publishedAt}</h5>
          </MovieTitleAuthorContainer>
        </MovieContentHeader>

        <MovieDescriptionContainer>
          <p>{article?.description}</p>
        </MovieDescriptionContainer>
      </MovieContentConatiner>

      <Buttons
        onClick={() => {
          articleResponse.articles.length - 1 === pageNumber
            ? startBeginning()
            : onNextButton();
        }}
      >
        <img src={NextIcon} alt="" />
      </Buttons>
    </MoviesStyles>
  ) : (
    <p>Loading....</p>
  );
};

export default Movies;

const MoviesStyles = styled.div`
  background-color: #333;
  grid-area: 6/6/10/9;
  margin-bottom: 0.5em;
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: 10px;
`;

const MovieContentConatiner = styled.div`
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
  min-width: 90%;
  min-height: 90%;
  margin-top: 2rem;
`;

const MovieContentHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const MovieImageContainer = styled.div`
  img {
    height: 13rem;
    width: 19rem;
    overflow: none;
    border-radius: 5px;
  }
`;

const MovieTitleAuthorContainer = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0 0.3rem 0 0.7rem;
  }
  h4 {
    margin: 2rem 0.3rem 0 1.2rem;
  }

  h5 {
    margin: 0 0.3rem 0 1.2rem;
  }
`;

const MovieDescriptionContainer = styled.div`
  p {
    font-family: sans-serif;
  }
`;
