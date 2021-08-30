import { IMoreInfoPageProps } from "../api/newsApi";
import styled from "styled-components";

const MoreInfo: React.FC<IMoreInfoPageProps> = ({ selectedArticle }) => {
    console.log(selectedArticle);
  return (
    <MoreInfoStyles>
      {selectedArticle.title}
      {selectedArticle.author}
      {selectedArticle.source.name}
      {selectedArticle.publishedAt}
      {selectedArticle.content}
      <img src={selectedArticle.urlToImage} alt={selectedArticle.title}/>
      {selectedArticle.url}
    </MoreInfoStyles>
  );
};

export default MoreInfo;

const MoreInfoStyles = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: blue;
`;