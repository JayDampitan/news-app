import styled from "styled-components";
import { AdsProp } from "../api/adsApi";

const Ads: React.FC<AdsProp> = ({ adsResponse, adsDataGrabber }) => {
  return (
    <AdsStyles>
      <h4>Joke of the Day</h4>
      <p>{adsResponse.body?.setup}</p>
      <p>{adsResponse.body?.punchline}</p>
      <button onClick={() => adsDataGrabber()}>New Joke</button>
    </AdsStyles>
  );
};

export default Ads;

const AdsStyles = styled.div`
  background-color: orange;
  grid-area: 4/9/10/10;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
`;
