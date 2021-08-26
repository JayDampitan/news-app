import styled from "styled-components";
import { NewsResponse } from "../api/newsApi";
import { usePagination } from "../hooks";

interface SportsProps {
  sportsArticle: NewsResponse;
}

const Sports: React.FC<SportsProps> = ({ sportsArticle }) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();
  
  const article = sportsArticle.articles?.[pageNumber];

  return (
  <SportsStyles>
    <button
        onClick={() => {
          sportsArticle.articles.length - 1 === pageNumber
            ? startBeginning()
            : onNextButton();
        }}
      >
        Next Button
      </button>

      <button
        onClick={() => {
          pageNumber === 0
            ? startEnd(sportsArticle.articles.length - 1)
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
  </SportsStyles>
  );
};

export default Sports;

const SportsStyles = styled.div`
background-color: yellow;
grid-area: 7/1/10/3;
margin-left: .5em;
margin-bottom .5em;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  overflow: none;
`;