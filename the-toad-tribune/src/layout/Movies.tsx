import styled from "styled-components";
import { NewsProps } from "../api/newsApi";
import { usePagination } from "../hooks";

const Movies: React.FC<NewsProps> = ({
  articleResponse,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return articleResponse.articles.length ? (
    <MoviesStyles>
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
    </MoviesStyles>
  ) : (
    <p>Loading....</p>
  );
};

export default Movies;

const MoviesStyles = styled.div`
  background-color: purple;
  grid-area: 6/6/10/9;
  margin-bottom: 0.5em;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  overflow: none;
`;
