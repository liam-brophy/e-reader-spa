import React from "react";

const StoryCard = ({ story }) => {
  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
      <h2>{story.title}</h2>
      <p>Author: {story.author}</p>
      {/* <p>{book.content.substring(0, 100)}...</p> Preview the content */}
    </div>
  );
};

export default StoryCard;