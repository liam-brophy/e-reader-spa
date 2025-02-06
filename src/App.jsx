import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes";
import NavBar from "./components/NavBar";

function App() {
  const [stories, setStories] = useState([]);


  useEffect(() => {
    // Fetch books
    fetch("http://localhost:3001/stories")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  return (
    <Router>
      <NavBar />
      <AppRouter stories={stories} />
    </Router>
  );
}

export default App;