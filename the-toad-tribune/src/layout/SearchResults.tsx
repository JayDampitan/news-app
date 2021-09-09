import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getNewsEverything, NewsEverythingRequest } from "../api";
import type { INewsResponse } from "../api";
import { ReactComponent as NextButtonIconComponent } from "../assets/next-button.svg";
import { ReactComponent as PreviousButtonIconComponent } from "../assets/prev-button.svg";
import { DarkModeProps } from "../api/newsApi";
import { dateConverter } from "../utils/dateConverter";

interface SearchResultsProps {
  darkMode: Boolean;
  pageNumber: number;
  renderMoreInfoPage: Function;
  searchResults: INewsResponse;
  searchValue: string;
  setPageNumber: Function;
  setSnackbarMessage: Function;
  setSearchResults: Function;
  setSelectedArticle: Function;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  darkMode,
  pageNumber,
  renderMoreInfoPage,
  searchResults,
  searchValue,
  setPageNumber,
  setSnackbarMessage,
  setSearchResults,
  setSelectedArticle,
}) => {
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
    setPageNumber((prevPageNumber: number) => prevPageNumber + 1);

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
    setPageNumber((prevPageNumber: number) => prevPageNumber - 1);

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
            {article.author} - {dateConverter(article?.publishedAt)} -{" "}
            {article.source.name}
          </span>
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
          <div
            className="down-btn"
            onClick={() => {
              pageNumber > 1 && getPrevPage();
            }}
          >
            <PreviousButtonIconComponent />
          </div>
          <span className="page-results">{`${pageNumber}/${totalPages}`}</span>
          <div
            onClick={() => {
              pageNumber < totalPages && getNextPage();
            }}
            className="up-btn"
          >
            <NextButtonIconComponent />
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

  span:nth-of-type(1):not(.page-results) {
    cursor: pointer;
  }

  .btn-container {
    display: flex;
    margin-top: 2rem;
    margin-bottom: 2rem;
    align-items: center;

    .down-btn,
    .up-btn {
      background-color: ${(props) => (props.darkMode ? "#1a1a1a" : "#e3dac9")};
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      margin: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: double;

      svg {
        height: 1.6rem;
        width: 1.6rem;

        & g {
          fill: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
  }

  a {
    width: 6.4rem;
    margin: 10px
  }
`;

const ArticleStyles = styled.div`
  display: flex;
  padding: 1rem;
  margin: 0.5rem;
  width: 90%;
  height: 12rem;
  border: double;
  border-top: none;
  border-left: none;
  border-right: none;
  justify-content: space-between;
  overflow: hidden;

  @media only screen and (max-width: 899px) {
    height: auto;
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (max-width: 599px) {
    height: auto;
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (max-width: 479px) {
    height: auto;
    flex-direction: column;
    align-items: center;
  }

  @media only screen and (max-width: 379px) {
    height: auto;
    flex-direction: column;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  min-width: 25%;
  max-width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 3vh;
  

  img {
    height: 100%;
    border-radius: 10px;
    border: 1px solid black;
    cursor: pointer;
  }

  @media only screen and (max-width: 1199px) {
    margin-left: 15px;
    width: 80%; 
    height: 80%;
    margin-top: 13px;
    margin-right: 3vw;
  }

  @media only screen and (max-width: 899px) {
    height: 20vh;
  }

  @media only screen and (max-width: 599px) {
    height: 20vh;
  }

  @media only screen and (max-width: 479px) {
    height: 15vh;
  }

  @media only screen and (max-width: 379px) {
    height: 15vh;
  }
`;

const ArticleInfoContainerStyles = styled.div<DarkModeProps>`
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  max-width: 75%;
  min-width: 75%;
  overflow: hidden;

  @media only screen and (max-width: 899px) {
      align-items: center;
    }



  span:first-of-type {
    font-weight: 700;
    margin-bottom: 10px;
  }

  span {
    margin: 15px;
  }
    

  a {
    text-decoration: none !important;
    color: ${(props) => (props.darkMode ? "#ffffff7f" : "#0200005a")};
  }

  p {
    margin: 15px;
      
    @media only screen and (max-width: 1199px) {
      font-size: 14px;
    }

    @media only screen and (max-width: 899px) {
      font-size: 13px;
    }

    @media only screen and (max-width: 599px) {
      font-size: 12px;
    }

    @media only screen and (max-width: 379px) {
      font-size: 12px;
    }
  }
`;
