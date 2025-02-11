import React from "react";
import StoryCard from "./StoryCard";
import '../index.css';

const StoryList = ({ stories }) => {
  return (
<div className="storyList">
      {stories.length === 0 ? (
        <p>No stories found</p>
      ) : (
        stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))
      )}
    </div>
  );
};

export default StoryList;

