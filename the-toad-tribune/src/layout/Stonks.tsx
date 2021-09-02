import styled from "styled-components";
import type { INewsProps } from "../api";
import { usePagination } from "../hooks";
import {
  ArticleContentContainer2,
  DescriptionContainer2,
  Buttons,
  HeaderContainer2,
  ImageContainer2,
} from "../commons";

import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";

const StonksArticle: React.FC<INewsProps> = ({
  articleResponse,
  darkMode,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <StonksStyles>
      <Buttons
        onClick={() => {
          pageNumber === 0
            ? startEnd(articleResponse.articles.length - 1)
            : onPrevButton();
        }}
        className="add-class"
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
          <h5>{article?.publishedAt}</h5>
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
    </StonksStyles>
  ) : (
    <p>Loading...</p>
  );
};

export default StonksArticle;

const StonksStyles = styled.div`
  background-color: transparent;
  border: double;
  border-bottom: none;
  border-top: none;
  grid-area: 6/4/10/6;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 0.5em;
`;
