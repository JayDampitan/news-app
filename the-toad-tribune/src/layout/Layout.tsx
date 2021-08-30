import React from "react";
import styled from "styled-components";

interface LayoutProps {
  Ads: JSX.Element;
  Animals: JSX.Element;
  isMainLayout: Boolean;
  isMoreInfo: Boolean;
  isSearchPage: Boolean;
  MainArticle: JSX.Element;
  MoreInfo: JSX.Element;
  Movies: JSX.Element;
  Navigation: JSX.Element;
  Politics: JSX.Element;
  SearchResults: JSX.Element;
  Sports: JSX.Element;
  Stonks: JSX.Element;
  Weather: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({
  Ads,
  Animals,
  isMainLayout,
  isMoreInfo,
  isSearchPage,
  MainArticle,
  MoreInfo,
  Movies,
  Navigation,
  Politics,
  SearchResults,
  Sports,
  Stonks,
  Weather,
}) => {
  const renderPage = (determiner: string) => {
    switch (determiner) {
      case "MainLayout":
        return (
          <MainLayoutStyles>
            {Ads}
            {Animals}
            {MainArticle}
            {Movies}
            {Navigation}
            {Politics}
            {Sports}
            {Stonks}
            {Weather}
          </MainLayoutStyles>
        );

      case "MoreInfo":
        return (
          <>
            {Navigation}
            {MoreInfo}
          </>
        );

      case "SearchPage":
        return (
          <SearchPageStyles>
            {Navigation}
            {SearchResults}
          </SearchPageStyles>
        );

      default:
        break;
    }
  };

  return (
    <>
      {isMainLayout && renderPage("MainLayout")}
      {isMoreInfo && renderPage("MoreInfo")}
      {isSearchPage && renderPage("SearchPage")}
    </>
  );
};

export default Layout;

const MainLayoutStyles = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: green;
  display: grid;
  grid-row-gap: 0.5em;
  grid-column-gap: 0.5em;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  position: fixed;
`;

const SearchPageStyles = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: grey;
`;
