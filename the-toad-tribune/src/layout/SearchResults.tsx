import styled from "styled-components";
import { IArticle } from "../api/newsApi";
import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";

interface SearchResultsProps {
  renderMoreInfoPage: Function;
  results: IArticle[];
  setSelectedArticle: Function;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  renderMoreInfoPage,
  results,
  setSelectedArticle,
}) => {
  const renderResults = () => {
    return results.map((article) => (
      <>
        <ArticleStyles key={article.url}>
          <img
            src={article.urlToImage}
            alt={article.description}
            onClick={() => {
              setSelectedArticle(article);
              renderMoreInfoPage();
            }}
          />
          <ArticleInfoContainerStyles>
            <span
              onClick={() => {
                setSelectedArticle(article);
                renderMoreInfoPage();
              }}
            >
              {article.title}
            </span>
            <span>
              {article.author} - {article.publishedAt} - {article.source.name}
            </span>
            <a href={article.url} target="_blank">
              Link to Article
            </a>
            <p>{article.description}</p>
          </ArticleInfoContainerStyles>
        </ArticleStyles>
        <HorizontalLine></HorizontalLine>
      </>
    ));
  };

  return(
    <ArticleContainerStyles>
    {renderResults()}
    <div className="btn-container">
    <div className="down-btn">
    <img src={PrevIcon} alt="previous button"/>
    </div>
    <span>1/2</span>
    <div className="up-btn">
    <img src={NextIcon} alt="next button"/>
    </div>
    </div>
    </ArticleContainerStyles>
  );

};

export default SearchResults;

const ArticleContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 5rem;

  .btn-container {
    display: flex;
    background-color: red;
    margin-top: 2rem;
    align-items: center;

  .down-btn,
  .up-btn{
    background-color: green;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    margin: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
      height: 1.6rem;
      width: 1.6rem;
    }
  }

  }
  }

  a {
    width: 6.4rem;
  }
`;

const ArticleStyles = styled.div`
  display: flex;
  padding: 1rem;
  margin: 0.5rem;
  width: 90%;
  height: 8rem;

  img {
    height: 100%;
    border-radius: 10px;
  }
`;

const ArticleInfoContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const HorizontalLine = styled.div`
  height: 2px;
  width: 90%;
  background-color: black;
`;
