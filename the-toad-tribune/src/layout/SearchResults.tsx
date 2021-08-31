import styled from "styled-components";
import { IArticle } from "../api/newsApi";

interface SearchResultsProps {
  results: IArticle[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  const renderResults = () => {
    return results.map((article) => <ArticleStyles key={article.url}>{article.title}</ArticleStyles>);
  };

  return <ArticleContainerStyles>{renderResults()}</ArticleContainerStyles>;
};

export default SearchResults;

const ArticleContainerStyles = styled.div`

`

const ArticleStyles = styled.div`

`