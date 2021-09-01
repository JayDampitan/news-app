import styled from "styled-components";
import { usePagination } from "../hooks";
import type { INewsProps } from "../api";
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

const Animals: React.FC<INewsProps> = ({
  articleResponse,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <AnimalsStyles>
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
    </AnimalsStyles>
  ) : (
    <p>Loading...</p>
  );
};

export default Animals;

const AnimalsStyles = styled.div`
  background-color: white;
  grid-area: 8/3/10/6;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 0.5em;
  cursor: pointer;
`;
