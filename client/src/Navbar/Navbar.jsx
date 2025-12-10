import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css"; // import the CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const username = token ? JSON.parse(atob(token.split(".")[1])).username : "";

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>Welcome To User management Sytem, {username}</h2>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
