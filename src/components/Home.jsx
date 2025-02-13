import React, { useState, useEffect, useContext } from "react";
import StoryList from "./StoryList";
import SearchBar from './SearchBar';
import { StoriesContext } from "../StoriesContext";

const Home = () => {
  const stories = useContext(StoriesContext);
  const [filteredStories, setFilteredStories] = useState(stories);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFilteredStories(stories);
  }, [stories]);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredStories(stories);
      return;
    }

    const filtered = stories.filter((story) =>
      story.title.toLowerCase().includes(query.toLowerCase()) ||
      story.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStories(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {(!searchQuery.trim() || filteredStories.length > 0) ? (
        <StoryList stories={filteredStories} />
      ) : (
        <div className="no-results">
          No stories found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default Home;