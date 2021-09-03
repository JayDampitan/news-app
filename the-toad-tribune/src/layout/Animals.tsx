import styled from "styled-components";
import React from "react";
import { usePagination } from "../hooks";
import type { INewsProps } from "../api";
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
import { dateConverter } from "../utils/dateConverter";
import { keyframes } from "styled-components";


const Animals: React.FC<INewsProps> = ({
  articleResponse,
  darkMode,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <AnimalsStyles darkMode={darkMode}>
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
        <h3>Animals</h3>
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
      >
        <img src={NextIcon} alt="" />
      </Buttons>
    </AnimalsStyles>
  ) : (
    <AnimalStylesLoader darkMode={darkMode}>
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
    </AnimalStylesLoader>
  );
};

export default Animals;

const AnimalsStyles = styled.div<DarkModeProps>`
  grid-area: 6/6/10/8;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5em;
  cursor: pointer;
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
`;

const textFlash = keyframes`
0%{
  background-color: hsl(0, 0%, 15%)
}

100%{
  background-color: hsl(0, 0%, 46%)
}
`;


const AnimalStylesLoader = styled.div<DarkModeProps>`
  grid-area: 6/6/10/8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 2vh;
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
