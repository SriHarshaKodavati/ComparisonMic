import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaLungs, FaBars, FaTimes, FaInfoCircle, FaProjectDiagram, FaChartBar } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMenu}>
            <FaLungs className="navbar-icon" />
            <span>Medical Image Analysis</span>
          </Link>

          <div className="menu-icon" onClick={toggleMenu}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>

          <nav className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  onClick={closeMenu}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/chexnet-info" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  onClick={closeMenu}
                >
                  <FaInfoCircle className="nav-icon" /> CheXNet Info
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/pipeline-explorer" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  onClick={closeMenu}
                >
                  <FaProjectDiagram className="nav-icon" /> Pipeline Explorer
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink 
                  to="/model-comparison" 
                  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                  onClick={closeMenu}
                >
                  <FaChartBar className="nav-icon" /> Model Comparison
                </NavLink>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link" onClick={closeMenu}>
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;