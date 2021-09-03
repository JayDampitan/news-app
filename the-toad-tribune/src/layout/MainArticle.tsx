import styled from "styled-components";
import type { INewsProps } from "../api";
import { usePagination } from "../hooks";
import { Buttons } from "../commons";
import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";
import { DarkModeProps } from "../api/newsApi";
import { dateConverter } from "../utils/dateConverter";
import { keyframes } from "styled-components";

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
    <MainArticleStyles darkMode={darkMode}>
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

      <h3 className="main-article-title">Top Headlines</h3>
      <MainArticleContentContainer
        onClick={() => {
          renderMoreInfoPage();
          setSelectedArticle(article);
        }}
      >
        <div className="img-container">
          <Image src={article?.urlToImage} />
        </div>
        <MainArticleHeaderContainer>
          <div className="main-content">
            <h3> {article?.title} </h3>

            <h4> {article?.author} </h4>

                <h5>{dateConverter(article?.publishedAt)}</h5>
            </div>
          <MainArticleDescriptionConatiner>
            <p>{article?.description}</p>
          </MainArticleDescriptionConatiner>
        </MainArticleHeaderContainer>
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
    <MainArticleStylesLoader darkMode={darkMode}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </MainArticleStylesLoader>
  );
};

export default MainArticle;

const MainArticleStyles = styled.div<DarkModeProps>`
  border: double;
  border-top: none;
  border-right: none;
  grid-area: 2/3/6/8;
  cursor: pointer;
  overflow: hidden;
  margin-top: 1vh;
  padding: 1rem;
  display: flex;
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
  justify-content: center;
  align-items: center;
  position: relative;

  .main-article-title {
    position: absolute;
    margin-bottom: 2rem;
    top: 0;
  }

  h3 {
    margin: 0;
  }

  .img-container {
    width: 70%;
  }
`;

const MainArticleContentContainer = styled.div`
  max-height: 90%;
  max-width: 90%;
  display: flex;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  border-radius: 6px;
  border: 1px solid black;
`;

const MainArticleHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;

  .main-content {
    h3 {
      margin: 0 0 0 2rem;
    }
    h4 {
      margin: 2rem 0 0 3rem;
    }
    h5 {
      margin: 0 0 0 3rem;
    }
  }
`;

const MainArticleDescriptionConatiner = styled.div`
  margin: 0 0 0 2rem;

  p::first-letter {
    font-size: 30px;
    line-height: 2.5rem;
  }
`;

const textFlash = keyframes`
0%{
  background-color: hsl(0, 0%, 15%)
}

100%{
  background-color: hsl(0, 0%, 46%)
}
`;

const MainArticleStylesLoader = styled.div<DarkModeProps>`
  border: double;
  border-top: none;
  border-right: none;
  grid-area: 2/3/6/8;
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
  justify-content: center;
  align-items: center;
  

  div:nth-child(odd) {
    height: 1rem;
    width: 80%;
    margin: 1vh;
    border-radius: 0.175rem;
    background-color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
    animation: ${textFlash} .8s linear infinite alternate;
    opacity: 0.3;
  }

  div:nth-child(even) {
    height: 1rem;
    width: 75%;
    margin: 1vh;
    border-radius: 0.125rem;
    background-color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
    animation: ${textFlash} 1.2s linear infinite alternate;
    opacity: 0.3;
  }
`