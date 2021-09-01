import styled from "styled-components";
import { usePagination } from "../hooks";
import { NewsProps } from "../api/newsApi";
import {
  ArticleContentContainer2,
  ArticleDescriptionContainer2,
  Buttons,
  HeaderContainer2,
  ImageContainer2,
} from "../commons";

import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";

const Politics: React.FC<NewsProps> = ({
  articleResponse,
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

        <ArticleContentContainer2 onClick={() => {
          renderMoreInfoPage();
          setSelectedArticle(article);
        }}>
          <ImageContainer2>
            <img src={article?.urlToImage} />
          </ImageContainer2>
         
          <HeaderContainer2>
            <h3>{article?.title}</h3>
            <h4>{article?.author}</h4>
            <h5>{article?.publishedAt}</h5>
          </HeaderContainer2>
          <ArticleDescriptionContainer2>
          {article?.description}
          </ArticleDescriptionContainer2>
            
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
  background-color: grey;
  grid-area: 2/1/7/3;
  margin-left: 0.5em;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
`;




