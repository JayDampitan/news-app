import styled from "styled-components";
import type { NewsProps } from "../api";
import { usePagination } from "../hooks";
import {
  ArticleContentContainer,
  ArticleDescriptionContainer,
  AuthorContainer,
  Buttons,
  HeaderContainer,
  ImageContainer,
  PublishedAtContainer,
  TitleContainer,
} from "../commons";

import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";

const Sports: React.FC<NewsProps> = ({
  articleResponse,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

    const article = articleResponse.articles?.[pageNumber];

    return articleResponse.articles.length ? (
      <SportsStyles>
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
  
        <ArticleContentContainer
          onClick={() => {
            renderMoreInfoPage();
            setSelectedArticle(article);
          }}
        >
          <HeaderContainer>
            <ImageContainer>
              <img src={article?.urlToImage} />
            </ImageContainer>
            <TitleContainer>
              <h3>{article?.title}</h3>
              <br />
              <AuthorContainer>
                <h4>{article?.author}</h4>
              </AuthorContainer>
              <PublishedAtContainer>
                <h5>{article?.publishedAt}</h5>
              </PublishedAtContainer>
            </TitleContainer>
          </HeaderContainer>
  
          <ArticleDescriptionContainer>
            <p>{article?.description}</p>
          </ArticleDescriptionContainer>
        </ArticleContentContainer>
        <Buttons
          onClick={() => {
            articleResponse.articles.length - 1 === pageNumber
              ? startBeginning()
              : onNextButton();
          }}
        >
          <img src={NextIcon} alt="" />
        </Buttons>
      </SportsStyles>
    ) : (
      <p>Loading...</p>
    );
  };

export default Sports;

const SportsStyles = styled.div`
background-color: yellow;
grid-area: 7/1/10/3;
display: flex;
justify-content: center;
margin-left: 0.5em;
margin-bottom: 0.5em;
align-items: center;
overflow: hidden;
border-radius: 10px;
cursor: pointer;
`;


