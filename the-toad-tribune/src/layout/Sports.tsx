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
import { DarkModeProps } from "../api/newsApi";
import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";

const Sports: React.FC<INewsProps> = ({
  articleResponse,
  darkMode,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <SportsStyles darkMode={darkMode}>
     
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
    </SportsStyles>
  ) : (
    <p>Loading...</p>
  );
};

export default Sports;

const SportsStyles = styled.div<DarkModeProps>`
  grid-area: 6/2/10/4;
  margin-left: 0.5em;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  color: ${props => props.darkMode ? "#e3dac9" : "hsl(0, 0%, 10%)"};
`;
