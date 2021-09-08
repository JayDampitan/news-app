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
import { ReactComponent as NextButtonIconComponent } from "../assets/next-button.svg";
import { ReactComponent as PreviousButtonIconComponent } from "../assets/prev-button.svg";
import { dateConverter } from "../utils/dateConverter";
import { keyframes } from "styled-components";

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
    <StonksStyles darkMode={darkMode}>
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
        <h3>Stocks</h3>
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
    </StonksStyles>
  ) : (
    <StonksStylesLoader darkMode={darkMode}>
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
    </StonksStylesLoader>
  );
};

export default StonksArticle;

const StonksStyles = styled.div<DarkModeProps>`
  background-color: transparent;
  justify-content: center;
  border: double;
  border-bottom: none;
  border-top: none;
  grid-area: 6/4/10/6;
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 0.5em;
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
  position: relative;

  @media only screen and (max-width: 1199px) {
    grid-area: 6/6/7/9;
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

const StonksStylesLoader = styled.div<DarkModeProps>`
  background-color: transparent;
  justify-content: center;
  border: double;
  border-bottom: none;
  border-top: none;
  grid-area: 6/4/10/6;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 0.5em;
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
    width: 75%;
    margin: 1vh;
    border-radius: 0.125rem;
    background-color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
    animation: ${textFlash} 1.2s linear infinite alternate;
    opacity: 0.3;
  }
`;
