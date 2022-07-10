import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="NavBar">
      <Link to="/">All Calls</Link> | <Link to="/inbox">Inbox</Link>
    </nav>
  );
};

export default Navbar;
