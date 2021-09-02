import styled from "styled-components";
import type { INewsProps } from "../api";
import { usePagination } from "../hooks";
import { Buttons } from "../commons";
import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";

const MainArticle: React.FC<INewsProps> = ({
  articleResponse,
  darkMode,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles?.length ? (
    <MainArticleStyles>
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
    
      <MainArticleContentContainer onClick={() => {
          renderMoreInfoPage();
          setSelectedArticle(article);
        }}>

        <div className="img-container">
          <Image src={article?.urlToImage} />
        </div>

        <div className="main-content">
          <h3> {article?.title} </h3>

          <h4> {article?.author} </h4>

          <h5>{article?.publishedAt}</h5>

          {article?.description}
        </div>

      </MainArticleContentContainer>

      <Buttons
        onClick={() => {
          articleResponse.articles.length - 1 === pageNumber
            ? startBeginning()
            : onNextButton();
        }}
      >
        <img src={NextIcon} alt="" />
      </Buttons>
    </MainArticleStyles>
    
  ) : (
    <p>Loading...</p>
  );
};

export default MainArticle;

const MainArticleStyles = styled.div`
  border: double;
  border-top: none;
  border-right: none;
  grid-area: 2/3/6/8;
  cursor: pointer;
  overflow: hidden;
  margin-top: 1vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  .img-container{
    min-width: 80%;
    max-width: 80%;
  }

  .main-content {

    h3 {
      margin: 0;
    }
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  
`;

const MainArticleContentContainer = styled.div`
  max-height: 90%;
  max-width: 90%;
  border: 1px solid red;
`;
