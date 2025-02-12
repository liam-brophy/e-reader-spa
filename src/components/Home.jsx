import React, { useState, useEffect } from "react";
import StoryList from "./StoryList";
import SearchBar from './SearchBar';

const Home = ({ stories }) => {
  const [filteredStories, setFilteredStories] = useState(stories);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setFilteredStories(stories);
  }, [stories]);

  const handleSearch = (query) => {
    setSearchQuery(query); // Store the current search query

    // if search is empty, show alllllll the stories
    if (!query.trim()) {
      setFilteredStories(stories);
      return;
    }

    // Filter stories based on title or author
    const filtered = stories.filter((story) =>
      story.title.toLowerCase().includes(query.toLowerCase()) ||
      story.author.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStories(filtered);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* Only show stories if search is empty OR there are matches */}
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