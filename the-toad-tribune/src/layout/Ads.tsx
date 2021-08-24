import styled from 'styled-components';

const Ads = () => {
  return (
  <AdsStyles>
    Ads
  </AdsStyles>
  );
};

export default Ads;

const AdsStyles = styled.div`
  background-color: orange;
  grid-area: 4/9/10/10;
  margin-right: .5em;
  margin-bottom: .5em;
`;
