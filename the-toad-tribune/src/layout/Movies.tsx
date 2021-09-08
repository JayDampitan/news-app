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
import { ReactComponent as PreviousButtonIconComponent } from "../assets/prev-button.svg";
import { dateConverter } from "../utils/dateConverter";
import { keyframes } from "styled-components";

const Movies: React.FC<INewsProps> = ({
  articleResponse,
  darkMode,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <MoviesStyles darkMode={darkMode}>
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
        <h3>Movies</h3>
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
    </MoviesStyles>
  ) : (
    <MoviesStylesLoader darkMode={darkMode}>
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
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </MoviesStylesLoader>
  );
};

export default Movies;

const MoviesStyles = styled.div<DarkModeProps>`
  border: double;
  border-right: none;
  border-bottom: none;
  grid-area: 4/8/10/9;
  cursor: pointer;
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  padding-left: 1rem;
  position: relative;

  @media only screen and (max-width: 1199px) {
    grid-area: 8/5/10/7;
    border-top: none;
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

const MoviesStylesLoader = styled.div<DarkModeProps>`
  border: double;
  border-right: none;
  border-bottom: none;
  grid-area: 4/8/10/9;
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
  display: flex;
  justify-content: flex-start;
  padding-top: 4vh;
  padding-left: 1vh;
  align-items: center;
  flex-direction: column;
  

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
