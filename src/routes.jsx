import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ReadingView from "./components/ReadingView";
import Notes from "./components/Notes";
// import NotFound from "./components/NotFound";

const AppRoutes = ({stories}) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home stories={stories} />} />
                <Route path="/read/:bookId" element={<ReadingView stories={stories} />} />
                <Route path="/notes" />
            </Routes>
        </Router>
    );
};

export default AppRoutes;