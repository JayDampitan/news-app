import type { IMoreInfoPageProps } from "../api";
import styled from "styled-components";
import { makeLoremIpsum } from "../utils/loremIpsum";
import { DarkModeProps } from "../api/newsApi";

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

  const dateConverter = (date: string) => {
    const newDate = date.split("T")[0];
    let newTime = date.split("T")[1].split("Z")[0];

    return `${newDate} at ${newTime}`;
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
  
  a{
    text-decoration: none !important;
    color: ${(props) => (props.darkMode ? "#ffffff7f" : "#0200005a")};
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
  }

  p {
  }
`;
