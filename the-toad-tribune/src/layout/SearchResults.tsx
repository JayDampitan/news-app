import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getNewsEverything, NewsEverythingRequest } from "../api";
import type { INewsResponse } from "../api";
import PrevIcon from "../commons/prev.png";
import NextIcon from "../commons/next.png";
import { DarkModeProps } from "../api/newsApi";

interface SearchResultsProps {
  darkMode: Boolean;
  renderMoreInfoPage: Function;
  searchResults: INewsResponse;
  searchValue: string;
  setSnackbarMessage: Function;
  setSearchResults: Function;
  setSelectedArticle: Function;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  darkMode,
  renderMoreInfoPage,
  searchResults,
  searchValue,
  setSnackbarMessage,
  setSearchResults,
  setSelectedArticle,
}) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const getTotalPages = () => {
    if (searchResults.totalResults <= 100) {
      if (searchResults.totalResults % 20 === 0) {
        setTotalPages(searchResults.totalResults / 20);
      } else {
        setTotalPages(Math.floor(searchResults.totalResults / 20) + 1);
      }
    } else {
      setTotalPages(5);
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

    getNewsEverything(searchStuff).then((results) => {
      if (results.status === "ok") {
        setSearchResults(results);
      }

      if (results.status === "error") {
        setSnackbarMessage(results.message);
      }
    });

    scrollToTop();
  };

  const getPrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);

    const searchStuff = new NewsEverythingRequest({
      q: searchValue,
      page: pageNumber - 1,
    });

    getNewsEverything(searchStuff).then((results) => {
      if (results.status === "ok") {
        setSearchResults(results);
      }

      if (results.status === "error") {
        setSnackbarMessage(results.message);
      }
    });

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
        <ArticleInfoContainerStyles darkMode={darkMode}>
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
          <a href={article.url} target="_blank" rel="noreferrer">
            Link to Article
          </a>
          <p>{article.description}</p>
        </ArticleInfoContainerStyles>
      </ArticleStyles>
    ));
  };

  return (
    <ArticleContainerStyles darkMode={darkMode}>
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

const ArticleContainerStyles = styled.div<DarkModeProps>`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => (props.darkMode ? "#1a1a1a" : "#e3dac9")};
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};

  span:nth-of-type(1) {
    cursor: pointer;
  }

  .btn-container {
    display: flex;
    margin-top: 2rem;
    align-items: center;

    .down-btn,
    .up-btn {
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

      img {
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
  border: double;
  border-top: none;
  border-left: none;
  border-right: none;
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

const ArticleInfoContainerStyles = styled.div<DarkModeProps>`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  max-width: 75%;
  min-width: 75%;

  a{
    text-decoration: none !important;
    color: ${(props) => (props.darkMode ? "#ffffff7f" : "#0200005a")};
  }

`;
