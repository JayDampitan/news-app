import styled from "styled-components";
import { NewsProps } from "../api/newsApi";
import { usePagination } from "../hooks";

const Sports: React.FC<NewsProps> = ({
  articleResponse,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
  const [onNextButton, onPrevButton, pageNumber, startBeginning, startEnd] =
    usePagination();

  const article = articleResponse.articles?.[pageNumber];

  return (
    <SportsStyles>
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
