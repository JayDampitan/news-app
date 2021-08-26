import styled from "styled-components";
import { usePagination } from "../hooks";
import { NewsProps } from "../api/newsApi";

const Politics: React.FC<NewsProps> = ({ articleResponse }) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <PoliticsStyles>
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
      <div>
        {article?.title}

        {article?.author}

        {article?.publishedAt}

        {article?.description}
      </div>
      <Image src={article?.urlToImage} />
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
