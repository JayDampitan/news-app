import React, { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import toadLight from "../assets/toadTribuneLight.svg";
import toadDark from "../assets/toadTribuneDark.svg";
import { getNewsEverything, NewsEverythingRequest } from "../api";
import { DarkModeProps } from "../api/newsApi";


interface INavProps {
  darkMode: Boolean;
  renderMainLayoutPage: Function;
  renderSearchPage: Function;
  setdarkMode: Function;
  setPageNumber: Function;
  setSearchValue: Function;
  setSearchResults: Function;
}

const Navigation: React.FC<INavProps> = ({
  darkMode,
  renderMainLayoutPage,
  renderSearchPage,
  setdarkMode,
  setPageNumber,
  setSearchResults,
  setSearchValue,
}) => {
  const [validateSearchValue, setValidateSearchValue] = useState<string>("");
  const [searchError, setSearchError] = useState<string>("");

  const enterSubmit = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      if (!validateSearchValue) {
        setSearchError("Please enter a search value.");
      } else {
        setSearchError("");

        const searchStuff = new NewsEverythingRequest({
          q: validateSearchValue,
        });
        getNewsEverything(searchStuff).then((results) => {
          if (results.totalResults > 0) {
            setSearchValue(validateSearchValue);
            setSearchResults(results);
            setPageNumber(1);
            renderSearchPage();
          } else {
            setSearchError("Please enter a valid search value.");
          }
        });
      }
    }
  };

  return (
    <NavigationStyles darkMode={darkMode}>
      <div className="logo-container">
        <NavLogo onClick={() => setdarkMode(!darkMode)}>
          {" "}
          <img src={darkMode ? toadDark : toadLight} alt="" />{" "}
        </NavLogo>
        <div className="nav-text">{darkMode ? "Dark" : "Light"}</div>
      </div>

      <NavTitle onClick={() => renderMainLayoutPage()}>
        <span>The</span> <span>Toad</span> <span>Tribune</span>
      </NavTitle>

      <NavSearchContainer>
        <NavSearch
          darkMode={darkMode}
          placeholder="Search"
          id="input"
          className={searchError.length > 0 ? "error" : ""}
          value={validateSearchValue}
          onChange={(e) => setValidateSearchValue(e.target.value)}
          onKeyPress={enterSubmit}
        />

        <NavSearchError className={searchError.length > 0 ? "error" : ""}>
          {searchError}
        </NavSearchError>
      </NavSearchContainer>
    </NavigationStyles>
  );
};

export default Navigation;

const NavigationStyles = styled.div<DarkModeProps>`
  grid-area: 1/1/2/10;
  display: flex;
  justify-content: space-between;
  border: 5px double;
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: ${(props) => (props.darkMode ? "#1a1a1a" : "#e3dac9")};
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};

  .logo-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
  }

  .nav-text {
    margin: 1vh;
  }
`;

const NavLogo = styled.div`
  max-width: 80px;
  max-height: 80px;
  margin: 1rem 1rem 0 3rem;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: double;

  img {
    height: 80px;
    width: 80px;
  }
`;

const NavTitle = styled.h1`
  font-family: "Old English Text MT", Times, serif;
  font-size: 65px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0;
  padding: 0;
  letter-spacing: 3.5px;

  & span:not(:last-child) {
    margin-right: 20px;
  }

  & span::first-letter {
    font-size: 70px;
  }
`;

const NavSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavSearch = styled.input<DarkModeProps>`
  width: 250px;
  height: 30px;
  margin-top: 60px;
  margin-right: 80px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${(props) => (props.darkMode ? "#1a1a1a" : "#e3dac9")};
  color: ${(props) => (props.darkMode ? "#e3dac9" : "#1a1a1a")};

  border: double;
  outline: none;
  border-left: none;
  border-right: none;
  border-top: none;

  ::placeholder {
    color: ${(props) => (props.darkMode ? "#e3dac9 !important" : "#1a1a1a")};
  }

  &.error {
    border-bottom-color: red;

    ::placeholder,
    ::-webkit-input-placeholder {
      color: red;
    }
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    color: black;
    text-align: center;
    font-size: 20px;
  }
`;

const NavSearchError = styled.span`
  color: red;
  font-size: 13px;
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0;
  transform: translateY(-16px);
  transition: all 0.3s;

  &.error {
    opacity: 1;
    transform: translateY(3px);
  }
`;


