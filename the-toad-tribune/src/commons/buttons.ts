import styled from "styled-components";
import { DarkModeProps } from "./darkMode";

export const Buttons = styled.button<DarkModeProps>`
  height: 1.7rem;
  width: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: double;
  background-color: ${(props) => (props.darkMode ? "#1a1a1a" : "#e3dac9")};
  color: ${(props) => (props.darkMode) ? "#e3dac9" : "#1a1a1a"};
  border-radius: 50%;
  margin: 0.7rem;
  cursor: pointer;

  img {
    height: 1rem;
    width: 1rem;
  }

  svg {
    height: 1.6rem;
    width: 1.6rem;

    & g {
      fill: ${(props) => (props.darkMode) ? "#e3dac9" : "#1a1a1a"};
    }

    path {
      stroke: ${(props) => (props.darkMode) ? "#e3dac9" : "#1a1a1a"};
      stroke-width: 250px;
    }
  }
`;
