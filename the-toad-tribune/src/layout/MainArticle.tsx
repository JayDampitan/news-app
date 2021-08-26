import styled from "styled-components";
import { NewsResponse } from "../api/newsApi";
import { usePagination } from "../hooks";

interface MainArticleProps {
  mainArticle: NewsResponse;
}

const MainArticle: React.FC<MainArticleProps> = ({ mainArticle }) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = mainArticle.articles?.[pageNumber];

  return mainArticle.articles.length ? (
    <MainArticleStyles>
      <button
        onClick={() => {
          mainArticle.articles.length - 1 === pageNumber
            ? startBeginning()
            : onNextButton();
        }}
      >
        Next Button
      </button>
      <button
        onClick={() => {
          pageNumber === 0
            ? startEnd(mainArticle.articles.length - 1)
            : onPrevButton();
        }}
        className="add-class"
      >
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
