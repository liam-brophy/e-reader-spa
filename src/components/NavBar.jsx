import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNav = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`navbar-container ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleNav}>
        ☰
      </button>
      <nav>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/notes" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Notes
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;