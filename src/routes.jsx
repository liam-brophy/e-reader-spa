import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ReaderView from "./components/ReaderView";
import Notes from "./components/Notes";

const AppRoutes = ({ stories }) => {
  return (
    <Routes>
      <Route path="/" element={<Home stories={stories} />} />
      <Route path="/reader/:storyId" element={<ReaderView />} />
      <Route path="/notes" element={<Notes />} />
    </Routes>
  );
};

export default AppRoutes;