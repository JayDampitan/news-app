import styled from "styled-components";
import { NewsProps } from "../api/newsApi";
import { usePagination } from "../hooks";
import {
  ArticleContentContainer2,
  ArticleDescriptionContainer2,
  Buttons,
  HeaderContainer2,
  ImageContainer2,
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
          <ArticleDescriptionContainer2>
            <p>{article?.description}</p>
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


