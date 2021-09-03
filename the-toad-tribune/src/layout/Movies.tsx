import styled from "styled-components";
import type { INewsProps } from "../api";
import { usePagination } from "../hooks";
import {
  ArticleContentContainer2,
  Buttons,
  DescriptionContainer2,
  HeaderContainer2,
  ImageContainer2,
} from "../commons";
import { DarkModeProps } from "../api/newsApi";
import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";
import { dateConverter } from "../utils/dateConverter";

const Movies: React.FC<INewsProps> = ({
  articleResponse,
  darkMode,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <MoviesStyles darkMode={darkMode}>
      <Buttons
        onClick={() => {
          pageNumber === 0
            ? startEnd(articleResponse.articles.length - 1)
            : onPrevButton();
        }}
      >
        <img src={PrevIcon} alt="" />
      </Buttons>

      <ArticleContentContainer2
        onClick={() => {
          renderMoreInfoPage();
          setSelectedArticle(article);
        }}
      >
        <ImageContainer2>
          <img src={article?.urlToImage} />
        </ImageContainer2>

        <HeaderContainer2>
          <h3>{article?.title}</h3>
          <h4>{article?.author}</h4>
          <h5>{dateConverter(article?.publishedAt)}</h5>
        </HeaderContainer2>

        <DescriptionContainer2>
          <p>{article?.description}</p>
        </DescriptionContainer2>

      </ArticleContentContainer2>

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

const MoviesStyles = styled.div<DarkModeProps>`
  border: double;
  border-right: none;
  border-bottom: none;
  grid-area: 4/8/10/9;
  margin-bottom: 0.5em;
  margin-right: .5rem;
  cursor: pointer;
  color: ${props => props.darkMode ? "#e3dac9" : "#1a1a1a"};
`



