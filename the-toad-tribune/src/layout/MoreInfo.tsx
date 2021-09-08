import type { IMoreInfoPageProps } from "../api";
import styled from "styled-components";
import { makeLoremIpsum } from "../utils/loremIpsum";
import { DarkModeProps } from "../api/newsApi";
import { dateConverter } from "../utils/dateConverter";

const MoreInfo: React.FC<IMoreInfoPageProps> = ({ darkMode, selectedArticle }) => {
  const getContent = () => {
    return (
      <div className="content-container">
        <p>{selectedArticle.content?.split("…")[0]} {makeLoremIpsum()}</p>
        <p>{makeLoremIpsum()}</p>
        <p>{makeLoremIpsum()}</p>
        <p>{makeLoremIpsum()}</p>
        <p>{makeLoremIpsum()}</p>
        <p>{makeLoremIpsum()}</p>
        <p>{makeLoremIpsum()}</p>
        <p>{makeLoremIpsum()}</p>
        <p>{makeLoremIpsum()}</p>
      </div>
    );
  };



  return (
    <MoreInfoStyles darkMode={darkMode}>
      <h1> {selectedArticle.title}</h1>

      <span>Author: {selectedArticle.author}</span>
      <span>Source: {selectedArticle.source.name}</span>
      <span>Published: {dateConverter(selectedArticle.publishedAt)}</span>
      <a href={selectedArticle.url} target="_blank" rel="noreferrer">Link To Article</a>
      <div className="image-container">
        <img src={selectedArticle.urlToImage} alt={selectedArticle.title} />
      </div>
      {getContent()}
    </MoreInfoStyles>
  );
};

export default MoreInfo;

const MoreInfoStyles = styled.div<DarkModeProps>`
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  background-color: ${(props) => (props.darkMode ? "#1a1a1a" : "#e3dac9")};
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};

  h1{
    font-size: 40px;

    @media only screen and (max-width: 1199px) {
      font-size: 30px;
      display: flex;
      justify-content: center;
    }

    @media only screen and (max-width: 899px) {
      font-size: 25px;
    }

    @media only screen and (max-width: 599px) {
      font-size: 20px;
    }

    @media only screen and (max-width: 479px) {
      font-size: 15px;
    }

    @media only screen and (max-width: 379px) {
      font-size: 20px;
    }
  }
  
  a{
    text-decoration: none !important;
    color: ${(props) => (props.darkMode ? "#ffffff7f" : "#0200005a")};
  }

  span{

    @media only screen and (max-width: 1199px) {
      font-size: 15px;
    }

    @media only screen and (max-width: 899px) {
      font-size: 13px;
    }

    @media only screen and (max-width: 599px) {
      font-size: 11px;
    }
  }

  .content-container {
    margin-left: auto;
    margin-right: auto;
    width: 60vw;

    p:first-child::first-letter {
      font-size: 30px;
    }
    
  }

  .image-container {
    display: flex;
    justify-content: center;
    width: 50vw;
    height: 50vh;
    margin: 3vh;

    img {
      height: 100%;
      border-radius: 15px;
      border: 1px solid grey;
    }
    
    @media only screen and (max-width: 1199px) {
      height: 45vh;
    }

    @media only screen and (max-width: 899px) {
      height: 40vh;
    }

    @media only screen and (max-width: 599px) {
      height: 25vh;
    }
  }

`;
