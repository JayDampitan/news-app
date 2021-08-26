import styled from "styled-components";
import { NewsResponse } from "../api/newsApi";
import { usePagination } from "../hooks";

interface MoviesProps {
  moviesArticle: NewsResponse;
}

const Movies: React.FC<MoviesProps> = ({ moviesArticle }) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = moviesArticle.articles?.[pageNumber];

  return moviesArticle.articles.length ? (
    <MoviesStyles>
      <button
        onClick={() => {
          moviesArticle.articles.length - 1 === pageNumber
            ? startBeginning()
            : onNextButton();
        }}
      >
        Next Button
      </button>

      <button
        onClick={() => {
          pageNumber === 0
            ? startEnd(moviesArticle.articles.length - 1)
            : onPrevButton();
        }}
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
    </MoviesStyles>
  ) : (
    <p>Loading....</p>
  )
};

export default Movies;

const MoviesStyles = styled.div`
  background-color: purple;
  grid-area: 6/6/10/9;
  margin-bottom: .5em;
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  overflow: none;
`;
