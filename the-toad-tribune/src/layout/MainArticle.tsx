import styled from "styled-components";

const MainArticle = () => {
  return(
    <MainArticleStyles>
      Main Article
    </MainArticleStyles>

  )
  
};

export default MainArticle;

const MainArticleStyles = styled.div`
  background-color: blue;
  grid-area: 2/3/6/9;
`;
