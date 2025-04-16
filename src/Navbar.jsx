import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/calculate" className="nav-link">
        Calculate
      </Link>
      <Link to="/credits" className="nav-link">
        Credits
      </Link>
    </div>
  );
};

export default Navbar;
