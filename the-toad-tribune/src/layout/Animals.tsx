import styled from "styled-components";
import { usePagination } from "../hooks";
import { NewsResponse } from "../api/newsApi";

interface AnimalsProps {
  animalArticle: NewsResponse;
}

const Animals: React.FC<AnimalsProps> = ({ animalArticle }) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = animalArticle.articles?.[pageNumber];

  return animalArticle.articles.length ? (
    <AnimalsStyles>
      <button
        onClick={() => {
          animalArticle.articles.length - 1 === pageNumber
            ? startBeginning()
            : onNextButton();
        }}
      >
        Next Button
      </button>
      <button
        onClick={() => {
          pageNumber === 0
            ? startEnd(animalArticle.articles.length - 1)
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
    </AnimalsStyles>
  ) : (
    <p>Loading...</p>
  );
};

export default Animals;

const AnimalsStyles = styled.div`
  background-color: white;
  grid-area: 8/3/10/6;
  margin-bottom: 0.5em;
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  overflow: none;
`;
