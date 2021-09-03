import styled, {keyframes} from "styled-components";
import type { IWeatherProp } from "../api";
import babysun from "../assets/telebabysun.png";
import { DarkModeProps } from "../api/newsApi";

const Weather: React.FC<IWeatherProp> = ({ darkMode, weatherResponse }) => {
  return (
    <WeatherStyles darkMode={darkMode}>
      {weatherResponse.current.pressure > 0 ? (
        <>
          <div className="temp-location">
            {weatherResponse.location.name}, {weatherResponse.location.region}
          </div>
          <div className="icon-temp-container">
            <img src={weatherResponse.current.weather_icons[0]} />
            <div>{weatherResponse.current.temperature}°F</div>
          </div>
          <div>{weatherResponse.location.localtime.split(" ")[0]}</div>
        </>
      ) : (
        <div className="baby-sun-container">
          <img src={babysun} alt="teletubbies baby sun" />
        </div>
      )}
    </WeatherStyles>
  );
};

export default Weather;

const babySunAnimation = keyframes`
   0% {
       transform: translate(0px, 0px);
       animation-timing-function:ease-in-out
   }

   100% {
       transform: translate(0px, -180px);
       animation-timing-function:ease-in-out
   }
`

const WeatherStyles = styled.div<DarkModeProps>`
  border: double;
  border-top: none;
  border-right: none;
  border-bottom: none;
  grid-area: 2/8/4/9;
  margin-right: 0.5em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 2%;
  margin-top: 1vh;
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};

  & .temp-location {
    font-weight: 700;
  }

  .icon-temp-container {
    display: flex;
    align-items: center;
    flex-direction: column;

    div {
      margin-top: 5%;
    }
  }

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
  

  .baby-sun-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;

    img {
      position: absolute;
      height: 150px;
      width: 150px;
      margin-top: 180px;
      animation: ${babySunAnimation} 3s linear infinite alternate;
    }
  }
`;


