import React from "react";
import StoryList from "./StoryList";

const Home = ({ stories }) => {
  return (
    <div>
      <h1>Library</h1>
      <StoryList stories={stories} />
    </div>
  );
};

export default Home;
