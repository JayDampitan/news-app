import styled from "styled-components";
import { WeatherProp } from "../api/weatherApi";

const Weather: React.FC<WeatherProp> = ({ weatherResponse }) => {
  return (
    <WeatherStyles>
      <img src={weatherResponse.current.weather_icons[0]} />
      <div>{weatherResponse.current.temperature}°F</div>
       <div>{weatherResponse.location.name}, {weatherResponse.location.region}</div>
       <div>{weatherResponse.location.localtime}</div>
       
    </WeatherStyles>
  );
};

export default Weather;

const WeatherStyles = styled.div`
  background-color: yellow;
  grid-area: 2/9/4/10;
  margin-right: 0.5em;
`;
