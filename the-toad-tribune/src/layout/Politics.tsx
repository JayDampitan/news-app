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
import { ReactComponent as NextButtonIconComponent } from "../assets/next-button.svg";
import { ReactComponent as PreviousButtonIconComponent } from "../assets/prev-button.svg"
import { dateConverter } from "../utils/dateConverter";
import { keyframes } from "styled-components";

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
    <PoliticsStyles darkMode={darkMode}>
      <Buttons
        onClick={() => {
          pageNumber === 0
            ? startEnd(articleResponse.articles.length - 1)
            : onPrevButton();
        }}
        className="left-button"
        darkMode={darkMode}
      >
        <PreviousButtonIconComponent />
      </Buttons>

      <ArticleContentContainer2
        onClick={() => {
          renderMoreInfoPage();
          setSelectedArticle(article);
        }}
      >
        <h3>Politics</h3>
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
        className="right-button"
        darkMode={darkMode}
      >
        <NextButtonIconComponent />
      </Buttons>
    </PoliticsStyles>
  ) : (
    <PoliticsStylesLoader darkMode={darkMode}>
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
    </PoliticsStylesLoader>
  );
};

export default Politics;

const PoliticsStyles = styled.div<DarkModeProps>`
  grid-area: 2/2/6/3;
  border: double;
  border-left: none;
  border-top: none;
  border-right: none;
  padding: 0.25em;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 1vh;
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
  position: relative;

  @media only screen and (max-width: 1199px) {
    grid-area: 6/2/8/6;
    margin-top: 0;
    border-right: double;
  }

  @media only screen and (max-width: 599px) {
    margin-top: 1vh;
    padding: 1rem;
    border-right: none;
  }

  button {
    opacity: 0;
    position: absolute;
    transition: all 0.5s ease;
    top: 0;

    &.left-button {
      left: 0;
    }

    &.right-button {
      right: 0;
    }
  }

  &:hover {
    button {
      opacity: 1;
    }
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

const PoliticsStylesLoader = styled.div<DarkModeProps>`
  grid-area: 2/2/6/3;
  border: double;
  border-left: none;
  border-top: none;
  border-right: none;
  margin-left: 0.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1vh;
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};

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
    width: 70%;
    margin: 1vh;
    border-radius: 0.125rem;
    background-color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
    animation: ${textFlash} 1.2s linear infinite alternate;
    opacity: 0.3;
  }
`;
