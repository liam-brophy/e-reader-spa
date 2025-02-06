import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

const AppRoutes = ({ stories }) => {
  return (
    <Routes>
      <Route path="/" element={<Home stories={stories} />} />
      <Route path="/notes" element={<div>Notes Page Coming Soon!</div>} />
    </Routes>
  );
};

export default AppRoutes;