import React, { createContext, useState, useEffect } from "react";

export const StoriesContext = createContext();

export const StoriesProvider = ({ children }) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/stories")
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  return (
    <StoriesContext.Provider value={stories}>
      {children}
    </StoriesContext.Provider>
  );
};