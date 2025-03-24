"use client";

import { useState } from "react";
import { Link } from "react-router-dom"; 
import "../CSS/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">TMA</Link> 
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? "active" : ""}`}></span>
          <span className={`bar ${isOpen ? "active" : ""}`}></span>
          <span className={`bar ${isOpen ? "active" : ""}`}></span>
        </div>

        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link">Tasks</Link>  
          </li>
          <li className="navbar-item">
            <Link to="/assignee" className="navbar-link">Assignee</Link>
          </li>
          <li className="navbar-item">
            <Link to="/comments" className="navbar-link">Comments</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
