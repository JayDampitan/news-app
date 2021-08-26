import styled from "styled-components";
import { NewsResponse } from "../api/newsApi";
import { usePagination } from "../hooks";

interface StonksProps {
  stonksArticle: NewsResponse;
}

const StonksArticle: React.FC<StonksProps> = ({ stonksArticle }) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = stonksArticle.articles?.[pageNumber];

  return stonksArticle.articles.length ? (
    <StonksStyles>
      <button
        onClick={() => {
          stonksArticle.articles.length - 1 === pageNumber
            ? startBeginning()
            : onNextButton();
        }}
      >
        Next Button
      </button>
      <button
        onClick={() => {
          pageNumber === 0
            ? startEnd(stonksArticle.articles.length - 1)
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
    </StonksStyles>
  ) : (
    <p>Loading...</p>
  );
};

export default StonksArticle;

const StonksStyles = styled.div`
  background-color: pink;
  grid-area: 6/3/8/6;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  overflow: none;
`;

