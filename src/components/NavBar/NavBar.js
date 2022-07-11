import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  const setLinkStatus = ({ isActive }) => {
    if (isActive === true) {
      return "nav-link selected";
    }
    return "nav-link";
  };

  return (
    <nav className="NavBar">
      <NavLink className={setLinkStatus} to="/">
        All Calls
      </NavLink>{" "}
      <NavLink className={setLinkStatus} to="/inbox">
        Inbox
      </NavLink>
    </nav>
  );
};

export default Navbar;
