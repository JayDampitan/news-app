import styled from "styled-components";
import { NewsProps } from "../api/newsApi";
import { usePagination } from "../hooks";

const StonksArticle: React.FC<NewsProps> = ({
  articleResponse,
  renderMoreInfoPage,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <StonksStyles>
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
      <button onClick={() => renderMoreInfoPage()}> More Information </button>
      <div>
        {article?.title}

        {article?.author}

        {article?.publishedAt}

        {article?.description}
      </div>
      <Image src={article?.urlToImage} />
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
