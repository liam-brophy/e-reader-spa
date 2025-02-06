import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav>
    <ul style={{ display: "flex", gap: "10px", listStyleType: "none" }}>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/notes">Notes</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;