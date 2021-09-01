import styled from "styled-components";
import { usePagination } from "../hooks";
import type { NewsProps } from "../api";

const Politics: React.FC<NewsProps> = ({
  articleResponse,
  renderMoreInfoPage,
  setSelectedArticle,
}) => {
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
      <button
        onClick={() => {
          renderMoreInfoPage();
          setSelectedArticle(article);
        }}
      >
        More Information
      </button>
     
      <ImageContainer>
        <Image src={article?.urlToImage} />
      </ImageContainer>
     
      <PoliticsContentContainer>
        <PoliticsTitle>
          {article?.title}
        </PoliticsTitle>

          <PoliticsAuthors>
            {article?.author}
          </PoliticsAuthors>

          <PoliticsPublishedDate>
            {article?.publishedAt}
          </PoliticsPublishedDate>
        
          <PoliticsDescription>
          {article?.description}
          </PoliticsDescription>
      </PoliticsContentContainer>


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
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  overflow: none;
`;

const ImageContainer = styled.div`
  max-height: 50%;
  max-width: 100%;
`;

const PoliticsContentContainer = styled.div`
  min-height: 50%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  margin: .4rem .6rem .6rem .6rem;
`;

const PoliticsTitle = styled.h3`
  margin: .3rem;
`;

const PoliticsAuthors = styled.h4`
  margin: .4rem;
  
`;

const PoliticsPublishedDate = styled.h5`
margin: 0 .4rem .2rem .4rem;
`;

const PoliticsDescription = styled.p`
`;


