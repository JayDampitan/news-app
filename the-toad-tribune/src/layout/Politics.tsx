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

import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";

const Politics: React.FC<INewsProps> = ({
  articleResponse,
  darkMode,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <PoliticsStyles>
     
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
     
    </PoliticsStyles>
  ) : (
    <p>Loading...</p>
  );
};

export default Politics;

const PoliticsStyles = styled.div`
  grid-area: 2/2/6/3;
  border: double;
  border-left: none;
  border-top: none;
  border-right: none;
  margin-left: 0.5em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1vh;
`;

