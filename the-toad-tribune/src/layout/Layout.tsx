import React from "react";
import styled from "styled-components";

interface LayoutProps {
  Ads: JSX.Element;
  Animals: JSX.Element;
  MainArticle: JSX.Element;
  Movies: JSX.Element;
  Navigation: JSX.Element;
  Politics: JSX.Element;
  Sports: JSX.Element;
  Stonks: JSX.Element;
  Weather: JSX.Element;
}

const Layout: React.FC<LayoutProps> = ({
  Ads,
  Animals,
  MainArticle,
  Movies,
  Navigation,
  Politics,
  Sports,
  Stonks,
  Weather,
}) => {
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
