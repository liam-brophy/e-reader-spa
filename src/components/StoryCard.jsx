import React from "react";
import '../index.css';
import { useNavigate } from "react-router-dom";

const StoryCard = ({ story }) => {
  const navigate = useNavigate();

  const handleReadStory = () => {
    navigate(`/reader/${story.id}`);
  };

  return (
    <div onClick={handleReadStory} className="storyCard">
      <img src={story.image}></img>
      <h2>{story.title}</h2>
      <p>{story.author}</p>
    </div>
  );
};

export default StoryCard;