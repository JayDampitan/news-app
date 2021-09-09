import React from "react";
import styled from "styled-components";
import { DarkModeProps } from "../api/newsApi";

interface LayoutProps {
  Animals: JSX.Element;
  darkMode: Boolean;
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
  Animals,
  darkMode,
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
          <MainLayoutStyles darkMode={darkMode}>
            {Navigation}
            {MainArticle}
            {Politics}
            {Stonks}
            {Sports}
            {Animals}
            {Movies}
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
          <>
            {Navigation}
            {SearchResults}
          </>
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

const MainLayoutStyles = styled.div<DarkModeProps>`
  height: 100vh;
  width: 100vw;
  background-color: ${props => props.darkMode ? "#1a1a1a" : "#e3dac9"};
  display: grid;
  grid-template-columns: 8% 12% 12% 12% 12% 12% 12% 12% 8%;
  grid-template-rows: repeat(9, 1fr);
  position: fixed;

  @media only screen and (max-width: 1199px) {
    grid-template-columns: 4.5% 13% 13% 13% 13% 13% 13% 13% 4.5%;
  }

  @media only screen and (max-width: 991px) and (min-width: 600px) and (orientation: landscape) {
    display: block;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  @media only screen and (max-width: 599px) {
    display: block;
    width: 100%;
    height: 100%;
    overflow: auto;
  }
`;



