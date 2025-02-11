import React, { useState, useEffect } from "react";
import StoryList from "./StoryList";
import SearchBar from './SearchBar';

const Home = ({ stories }) => {
  const [filteredStories, setFilteredStories] = useState(stories);

  useEffect(() => {
    // initialize the filteredStories when stories prop changes?
    setFilteredStories(stories);
  }, [stories]);

  const handleSearch = (query) => {
    const filtered = stories.filter((story) =>
      story.title.toLowerCase().includes(query.toLowerCase()) ||
      story.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStories(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <StoryList stories={filteredStories.length ? filteredStories : stories} />
    </div>
  );
};

export default Home;
