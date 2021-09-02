import React, { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import toad from "../assets/toad.png"
import { getNewsEverything, NewsEverythingRequest } from "../api";


interface INavProps {
  renderMainLayoutPage: Function;
  renderSearchPage: Function;
  setSearchValue: Function;
  setSearchResults: Function;
}

const Navigation: React.FC<INavProps> = ({
  renderMainLayoutPage,
  renderSearchPage,
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
            renderSearchPage();
          } else {
            setSearchError("Please enter a valid search value.");
          }
        });
      }
    }
  };

  return (
    <NavigationStyles>
      <NavLogo onClick={() => renderMainLayoutPage()}> <img src={toad} alt="" /> </NavLogo>
      <NavTitle onClick={() => renderMainLayoutPage()}>
        <span>The</span> <span>Toad</span> <span>Tribune</span>
      </NavTitle>

      <NavSearchContainer>
        <NavSearch
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

const NavigationStyles = styled.div`
  grid-area: 1/1/2/10;
  display: flex;
  justify-content: space-between;
  border: double;
  border-top: none;
  border-right: none;
  border-left: none;
`;

const NavLogo = styled.div`
  max-width: 90px;
  max-height: 90px;
  margin: 1rem;
  border-radius: 50%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: double;

  img{
    height: 90px;
    width: 90px;
  }
`;

const NavTitle = styled.h1`
  font-family: "Times New Roman", Times, serif;
  font-size: 65px;
  display: flex;
  align-items: center;
  color: black;
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

const NavSearch = styled.input`
  width: 250px;
  height: 30px;
  margin-top: 30px;
  margin-right: 80px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: hsl(0, 0%, 18%);
  border: double;
  outline: none;
  border-left: none;
  border-right: none;
  border-top: none;

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
