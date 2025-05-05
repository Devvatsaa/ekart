import React, { useState } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userRedux"; // Import the logout action

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.form`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Username = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-left: 25px;
  color: teal;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const LogoutButton = styled.button`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  border: none;
  background: none;
  color: teal;
  font-weight: bold;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const quantity = cart.quantity;
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // Search functionality
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <Container>
      <Wrapper>
        {/* Left Section */}
        <Left>
          <Language>EN</Language>
          <SearchContainer onSubmit={handleSearch}>
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // onKeyDown={handleSearch} 
            />
            <button type="submit" style={{ border: "none", background: "none" }}>
              <SearchIcon style={{ color: "gray", fontSize: 16 }} />
            </button>
          </SearchContainer>
        </Left>

        {/* Center Section */}
        <Center>
          <Logo>VATSA.</Logo>
        </Center>

        {/* Right Section */}
        <Right>
          {user ? (
            <>
              <Username>{user.username}</Username> {/* Display Username */}
              <LogoutButton onClick={handleLogout}>LOGOUT</LogoutButton>
            </>
          ) : (
            <>
              <Link to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity > 0 ? quantity : 0} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
