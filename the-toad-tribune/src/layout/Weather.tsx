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
          <div className="weather-localtime">{weatherResponse.location.localtime.split(" ")[0]}</div>
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

  @media only screen and (max-width: 1199px) {
    grid-area: 8/7/10/9;
    justify-content: start;
  }

  @media only screen and (max-width: 1199px) and (min-width: 992px) and (orientation: landscape) {
    grid-area: 5/6/6/9;
  }

  @media only screen and (max-width: 599px) {
    border: none;
  }

  & .temp-location {
    font-weight: 700;

    @media only screen and (max-width: 899px) {
      text-align: center;
    }
  }

  .icon-temp-container {
    display: flex;
    align-items: center;
    flex-direction: column;

    @media only screen and (max-width: 1199px) {
      width: 35%;
      margin-top: 25px;
    }

    @media only screen and (max-width: 599px) {
      width: 15%;
    }

    div {
      margin-top: 5%;
    }
  }

  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;

    @media only screen and (max-width: 1199px) {
      width: 100%;
      height: 100%;
    }
  }
  
  & .weather-localtime {
    @media only screen and (max-width: 1199px) {
      margin-top: 25px;
    }
  }

  .baby-sun-container {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
    position: relative;

    @media only screen and (max-width: 599px) {
      height: 330px;
    }

    img {
      position: absolute;
      height: 150px;
      width: 150px;
      margin-top: 180px;
      animation: ${babySunAnimation} 3s linear infinite alternate;
    }
  }
`;


