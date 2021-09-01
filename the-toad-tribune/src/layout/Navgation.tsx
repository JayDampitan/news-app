import React, { KeyboardEvent, useState } from "react";
import styled from "styled-components";
import { getNewsEverything } from "../api/newsApi";
import { NewsEverythingRequest } from "../api";

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
  const [validateSearchValue, setValidateSearchValue] = useState("");
  const [searchError, setSearchError] = useState("");

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
      <NavLogo onClick={() => renderMainLayoutPage()}>Logo</NavLogo>
      <NavTitle onClick={() => renderMainLayoutPage()}>
        The Toad Tribune
      </NavTitle>

      <NavSearchContainer>
        <NavSearch
          placeholder="Search"
          id="input"
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
  background-color: #161925;
  grid-area: 1/1/2/10;
  display: flex;
  justify-content: space-between;
`;

const NavLogo = styled.div`
  width: 95px;
  height: 95px;
  background-color: #000;
  margin-top: 3px;
  margin-left: 80px;
  border-radius: 50%;
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavTitle = styled.h2`
  display: flex;
  align-items: center;
  color: white;
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
  border-radius: 20px;
  border: none;
  outline: none;

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
