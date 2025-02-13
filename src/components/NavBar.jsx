import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import { useTheme } from "../ThemeContext";
import BedtimeIcon from '@mui/icons-material/Bedtime';
import WbSunnyIcon from '@mui/icons-material/WbSunny';


function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start in collapsed state
  const { theme, toggleTheme } = useTheme();
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
          <li>
        <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? <BedtimeIcon /> : <WbSunnyIcon />}
      </button>
      </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;