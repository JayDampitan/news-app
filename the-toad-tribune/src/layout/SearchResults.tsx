import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { INewsResponse } from "../api/newsApi";
import { getNewsEverything } from "../api/newsApi";
import { NewsEverythingRequest } from "../api";
import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";

interface SearchResultsProps {
  renderMoreInfoPage: Function;
  searchResults: INewsResponse;
  searchValue: string;
  setSearchResults: Function;
  setSelectedArticle: Function;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  renderMoreInfoPage,
  searchResults,
  searchValue,
  setSearchResults,
  setSelectedArticle,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getTotalPages = () => {
    if (searchResults.totalResults % 20 === 0) {
      setTotalPages(searchResults.totalResults / 20);
    } else {
      setTotalPages(Math.floor(searchResults.totalResults / 20) + 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    getTotalPages();
  }, [searchResults]);

  const getNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
    const searchStuff = new NewsEverythingRequest({
      q: searchValue,
      page: pageNumber + 1,
    });
    getNewsEverything(searchStuff).then((results) => setSearchResults(results));
    scrollToTop();
  };

  const getPrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
    const searchStuff = new NewsEverythingRequest({
      q: searchValue,
      page: pageNumber - 1,
    });
    getNewsEverything(searchStuff).then((results) => setSearchResults(results));
    scrollToTop();
  };

  const renderResults = () => {
    return searchResults?.articles.map((article, i) => (
      <ArticleStyles key={i}>
        <ImageContainer>
          <img
            src={article.urlToImage}
            alt={article.description}
            onClick={() => {
              setSelectedArticle(article);
              renderMoreInfoPage();
            }}
          />
        </ImageContainer>
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
    ));
  };

  return (
    <ArticleContainerStyles>
      {renderResults()}
      {searchResults.articles.length > 0 && (
        <div className="btn-container">
          <div className="down-btn">
            <img
              onClick={() => {
                pageNumber > 1 && getPrevPage();
              }}
              src={PrevIcon}
              alt="previous button"
            />
          </div>
          <span>{`${pageNumber}/${totalPages}`}</span>
          <div
            onClick={() => {
              pageNumber < totalPages && getNextPage();
            }}
            className="up-btn"
          >
            <img src={NextIcon} alt="next button" />
          </div>
        </div>
      )}
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

  span:nth-of-type(1) {
    cursor: pointer;
  }

  .btn-container {
    display: flex;
    margin-top: 2rem;
    align-items: center;

  .down-btn,
  .up-btn{
    background-color: grey;
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    margin: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 1px 2px 2px 1px lightgrey;
    border: 1px solid black;

    img{
      height: 1.6rem;
      width: 1.6rem;
      
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
  border-bottom: 2px solid black;
  justify-content: space-between;
`;

const ImageContainer = styled.div`
  min-width: 25%;
  max-width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    height: 100%;
    border-radius: 10px;
    border: 1px solid black;
    cursor: pointer;
  }
`;

const ArticleInfoContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  max-width: 75%;
  min-width: 75%;
`;
