import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description'; 


function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start in collapsed state

  const toggleNav = () => setIsCollapsed(!isCollapsed);

  return (
    <div className={`navbar-container ${isCollapsed ? "collapsed" : ""}`}>
      <button className="toggle-btn" onClick={toggleNav}>
        ☰
      </button>
      <nav className={`nav ${isCollapsed ? "collapsed" : "expanded"}`}>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
             <HomeIcon />
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/notes" 
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              <DescriptionIcon />
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;