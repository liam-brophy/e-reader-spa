import React from "react";
import BookCard from "./StoryCard";

const BookList = ({ stories }) => {
  return (
    <div>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
};

export default StoryList;