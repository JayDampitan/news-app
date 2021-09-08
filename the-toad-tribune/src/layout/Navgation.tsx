import React, { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import logoDark from "../assets/dark-logo.png";
import logoLight from "../assets/light-logo.png";
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
          <img src={darkMode ? logoLight : logoDark} alt="Toad Tribune" />{" "}
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
    margin: 1vh 0 1vh 3vh;

    @media only screen and (max-width: 899px) {
      margin: 1vh 0 1vh 1.5vh;
    }

    @media only screen and (max-width: 599px) {
      font-size: 14px;
      margin: 1vh 0 1vh 0vh;
    }

    @media only screen and (max-width: 479px) {
      font-size: 12px;
      margin: 0.5vh 0 1vh 0vh;
    }

    @media only screen and (max-width: 379px) {
      font-size: 11px;
      margin: 0.5vh 0 1vh 2vh;
    }
  }

  @media only screen and (max-width: 379px) {
    justify-content: space-around;
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
    height: 90%;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding-right: 7px;
  }

  @media only screen and (max-width: 899px) {
    max-width: 60px;
    max-height: 60px;
    margin: 1rem 1rem 0 2rem;
  }

  @media only screen and (max-width: 599px) {
    margin: 1rem 1rem 0 1rem;
  }

  @media only screen and (max-width: 479px) {
    max-width: 40px;
    max-height: 40px;
    margin: 1rem 0.625rem 0 0.625rem;
  }

  @media only screen and (max-width: 379px) {
    margin: 1rem 0rem 0 0.625rem;
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

    @media only screen and (max-width: 899px) {
      margin-right: 10px;
    }

    @media only screen and (max-width: 379px) {
      margin-right: 2px;
    }
  }

  & span::first-letter {
    font-size: 70px;

    @media only screen and (max-width: 1199px) {
      font-size: 55px;
    }

    @media only screen and (max-width: 899px) {
      font-size: 40px;
    }

    @media only screen and (max-width: 599px) {
      font-size: 30px;
    }

    @media only screen and (max-width: 479px) {
      font-size: 25px;
    }

    @media only screen and (max-width: 379px) {
      font-size: 20px;
    }
  }

  @media only screen and (max-width: 1199px) {
    font-size: 50px;
  }

  @media only screen and (max-width: 899px) {
    font-size: 35px;
  }

  @media only screen and (max-width: 599px) {
    font-size: 25px;
  }

  @media only screen and (max-width: 479px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 379px) {
    flex-wrap: wrap;
    justify-content: center;
    font-size: 15px;
    width: 95px;
  }
`;

const NavSearchContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 899px) {
    margin-left: 20px;
  }

  @media only screen and (max-width: 599px) {
    margin-left: 10px
  }

  @media only screen and (max-width: 479px) {
    margin-left: 0;
  }
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

    @media only screen and (max-width: 899px) {
      font-size: 16px;
    }

    @media only screen and (max-width: 599px) {
      font-size: 14px
    }

    @media only screen and (max-width: 479px) {
      font-size: 11px;
    }
  }

  @media only screen and (max-width: 1199px) {
    width: 180px;
    font-size: 18px;
    margin-right: 60px;
  }

  @media only screen and (max-width: 899px) {
    width: 130px;
    font-size: 13px;
    margin-top: 35px;
    margin-right: 30px;
  }

  @media only screen and (max-width: 599px) {
    width: 100px;
    font-size: 12px;
    margin-right: 20px;
    padding-left: 5px;
    padding-right: 5px;
  }

  @media only screen and (max-width: 479px) {
    width: 80px;
    font-size: 10px;
    margin-top: 15px;
    margin-right: 10px;
    padding-left: 3px;
    padding-right: 3px;
  }

  @media only screen and (max-width: 379px) {
    width: 90px;
    font-size: 10px;
    margin-top: 7px;
  }
`;

const NavSearchError = styled.span`
  color: red;
  font-size: 13px;
  width: 250px;
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0;
  transform: translateY(-16px);
  transition: all 0.3s;

  &.error {
    opacity: 1;
    transform: translateY(3px);
  }

  @media only screen and (max-width: 1199px) {
    width: 180px;
  }

  @media only screen and (max-width: 899px) {
    font-size: 10px;
    width: 130px;
  }

  @media only screen and (max-width: 599px) {
    font-size: 9px;
    width: 100px;
    padding-left: 5px;
    padding-right: 5px;
  }

  @media only screen and (max-width: 479px) {
    width: 80px;
    font-size: 8px;
    padding-left: 3px;
    padding-right: 3px
  }

  @media only screen and (max-width: 379px) {
    width: 90px;
  }
`;


