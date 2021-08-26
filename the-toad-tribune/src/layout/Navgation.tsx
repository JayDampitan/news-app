import styled from "styled-components";

const Navigation = () => {
  return (
    <NavigationStyles>
      <NavLogo>Logo</NavLogo>
      <NavTitle>The Toad Tribune</NavTitle>
      <NavSearch placeholder="Search" />
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
  }
`;
