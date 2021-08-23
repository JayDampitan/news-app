import React from "react";

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
    <>
      {Ads}
      {Animals}
      {MainArticle}
      {Movies}
      {Navigation}
      {Politics}
      {Sports}
      {Stonks}
      {Weather}
    </>
  );
};

export default Layout;
