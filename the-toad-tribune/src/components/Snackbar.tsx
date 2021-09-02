import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface ISnackbarProps {
  bgColor: string;
}

const fadeIn = keyframes`
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 48px;
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    bottom: 48px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
`;

const SnackbarStyles = styled.div<ISnackbarProps>`
  position: fixed;
  bottom: 48px;
  left: 50%;
  font-size: 25.6px;
  font-weight: 400;
  text-align: center;
  color: white;
  background-color: ${(props) => props.bgColor};
  min-width: 400px;
  padding: 25.6px;
  border-radius: 3.2px;
  transform: translateX(-50%);
  visibility: hidden;
  z-index: 9999;

  &.show {
    visibility: visible;
    animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 4.7s;
  }
`;

const Snackbar: React.FC<ISnackbarProps> = ({ children, bgColor }) => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SnackbarStyles className={isActive ? "show" : ""} bgColor={bgColor}>
      {children}
    </SnackbarStyles>
  )
}

export default Snackbar;
