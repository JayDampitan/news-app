import styled from "styled-components";
import { usePagination } from "../hooks";
import { NewsResponse } from "../api/newsApi";

interface PoliticsProps {
  politicsArticle: NewsResponse;
}

const Politics: React.FC<PoliticsProps> = ({ politicsArticle }) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = politicsArticle.articles?.[pageNumber];

  return politicsArticle.articles.length ? (
    <PoliticsStyles>
      <button
        onClick={() => {
          politicsArticle.articles.length - 1 === pageNumber
            ? startBeginning()
            : onNextButton();
        }}
      >
        Next Button
      </button>
      <button
        onClick={() => {
          pageNumber === 0
            ? startEnd(politicsArticle.articles.length - 1)
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
    </PoliticsStyles>
  ) : (
    <p>Loading...</p>
  );
};

export default Politics;

const PoliticsStyles = styled.div`
  background-color: grey;
  grid-area: 2/1/7/3;
  margin-left: 0.5em;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  overflow: none;
`;
