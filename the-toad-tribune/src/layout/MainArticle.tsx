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

  const article = mainArticle.articles?.[mainArticleIndex];

  return mainArticle.articles.length ? (
    <MainArticleStyles>
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
      <div>
        {article?.title}
        {article?.author}
        {article?.publishedAt}
        {article?.description}
      </div>
      <Image src={article.urlToImage} />
    </MainArticleStyles>
  ) : (
    <p>Loading...</p>
  );
};

export default MainArticle;

const MainArticleStyles = styled.div`
  background-color: blue;
  grid-area: 2/3/6/9;
  background-repeat: no-repeat;
  background-position: center;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  overflow: none;
`;
