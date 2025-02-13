import React, { useState, useEffect, useContext } from "react";
import StoryList from "./StoryList";
import SearchBar from './SearchBar';
import { StoriesContext } from "../StoriesContext";

const Home = () => {
  const stories = useContext(StoriesContext);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filtered = stories.filter((story) => (
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.author.toLowerCase().includes(searchQuery.toLowerCase())
  ));

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {!searchQuery.trim() || filtered.length > 0 ? (
        <StoryList stories={filtered} />
      ) : (
        <div className="no-results">
          No stories found matching '{searchQuery}'
        </div>
      )}
    </div>
  );
};

export default Home;