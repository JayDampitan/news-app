import styled from "styled-components";
import type { INewsProps } from "../api";
import { usePagination } from "../hooks";

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
      <button
        onClick={() => {
          articleResponse.articles.length - 1 === pageNumber
            ? startBeginning()
            : onNextButton();
        }}
      >
        Next Button
      </button>
      <button
        onClick={() => {
          pageNumber === 0
            ? startEnd(articleResponse.articles.length - 1)
            : onPrevButton();
        }}
        className="add-class"
      >
        Previous Button
      </button>
      <button
        onClick={() => {
          renderMoreInfoPage();
          setSelectedArticle(article);
        }}
      >
        More Information
      </button>
      <div>
        {article?.title}

        {article?.author}

        {article?.publishedAt}

        {article?.description}
      </div>
      <Image src={article?.urlToImage} />
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
  cursor: pointer;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  overflow: none;
`;
