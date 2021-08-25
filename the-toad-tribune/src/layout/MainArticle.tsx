import styled from "styled-components";
import { NewsResponse } from "../api/newsApi";
import { useState } from "react";
interface MainArticleProps {
  mainArticle: NewsResponse;
}

const MainArticle: React.FC<MainArticleProps> = ({ mainArticle }) => {
  const [mainArticleIndex, setMainArticleIndex] = useState(0);

  const onNextButton = () => setMainArticleIndex((prevIndex) => prevIndex + 1);

  const onPrevButton = () => setMainArticleIndex((prevIndex) => prevIndex - 1);

  const startBeginning = () => setMainArticleIndex(0);

  const startEnd = (endIndex: number) => setMainArticleIndex(endIndex);

  return (
    <MainArticleStyles>
      {mainArticle.articles.length &&
        mainArticle.articles[mainArticleIndex]?.title}
      <button
        onClick={() => {
          mainArticle.articles.length - 1 === mainArticleIndex
            ? startBeginning()
            : onNextButton();
        }}
      >
        {" "}
        Next Button{" "}
      </button>
      <button
        onClick={() => {
          mainArticleIndex === 0
            ? startEnd(mainArticle.articles.length - 1)
            : onPrevButton();
        }}
        className="add-class"
      >
        {" "}
        Previous Button
      </button>
    </MainArticleStyles>
  );
};

export default MainArticle;

const MainArticleStyles = styled.div`
  background-color: blue;
  grid-area: 2/3/6/9;
`;
