import styled from 'styled-components';

const Weather = () => {
  return (
  <WeatherStyles>
    Weather
  </WeatherStyles>
  )
}

export default Weather;

const WeatherStyles = styled.div`
background-color: yellow;
  grid-area: 2/9/4/10;
  margin-right: .5em;
`;
