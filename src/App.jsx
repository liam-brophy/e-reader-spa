import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import NavBar from "./components/NavBar";
import './index.css';

function App() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/stories")
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  return (
    <Router>
      <NavBar />
      <AppRoutes stories={stories} />
    </Router>
  );
}

export default App;