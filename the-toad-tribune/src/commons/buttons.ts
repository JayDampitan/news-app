import styled from "styled-components";

export const Buttons = styled.button`
  height: 1.7rem;
  width: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  border: none;
  background-color: #fff;
  border-radius: 50%;
  margin: 0.1rem;

  img {
    height: 1.2rem;
    width: 1.2rem;
    color: #fff;
  }

  :hover {
    opacity: 1;
    transition: 0.7s;
  }
`;
