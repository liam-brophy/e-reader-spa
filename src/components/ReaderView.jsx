import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Slider } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const ReaderView = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [storyContent, setStoryContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const [pageContent, setPageContent] = useState("");
  const [pageSize, setPageSize] = useState(1000); // Number of characters per page
  const [totalPages, setTotalPages] = useState(0);
  const [progress, setProgress] = useState(0); // Total number of pages

  const popoverRef = useRef(null);

  // FETCH story and content
  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/stories/${storyId}`);
        if (!response.ok) throw new Error("Story not found");

        const data = await response.json();
        setStory(data);

        const storyResponse = await fetch(data.contentPath);
        if (!storyResponse.ok) throw new Error("Content not found");

        const text = await storyResponse.text();
        setStoryContent(text);

        // Set the total number of pages based on the content length and page size
        const total = Math.ceil(text.length / pageSize);
        setTotalPages(total);

      } catch (error) {
        console.error("Error fetching story content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [storyId, pageSize]);

  // Handle pagination logic
  useEffect(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    setPageContent(storyContent.slice(start, end));

    // update the progress (slider value) based on current page
    if (totalPages > 0) {
      const progressValue = (currentPage / totalPages) * 100;
      setProgress(progressValue);
    } else {
      setProgress(0); // If totalPages is 0 or invalid, set progress to 0
    }
  }, [currentPage, storyContent, pageSize, totalPages]);

  // handle clicks outside popover to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // get text for comment
  const getHighlightedText = () => {
    const selection = window.getSelection();
    return selection ? selection.toString() : "";
  };

  // handle text selection and display popover
  const handleTextSelection = () => {
    const text = getHighlightedText();
    if (text) {
      const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
      setPopoverPosition({ x: rect.x, y: rect.y });
      setSelectedText(text);
      setShowPopover(true);
    }
  };

  // save comment and post it to the notes
  const handleSaveComment = async () => {
    const newComment = {
      text: selectedText,
      comment: commentText,
      page: currentPage + 1,
      story: storyId
    };

    try {
      await fetch(`http://localhost:3001/notes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      setShowPopover(false);
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };

  // handle keydown for left and right arrow keys page turning
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft" && currentPage > 0) {
        setCurrentPage(currentPage - 1); // Previous page
      } else if (event.key === "ArrowRight" && currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1); // Next page
      }
    };

    // Add keydown event listener
    document.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, totalPages]); // Depend on currentPage and totalPages to update correctly


  const handleSliderChange = (event, newValue) => {
    if (!isNaN(newValue)) {
      setCurrentPage(Math.floor(newValue * totalPages / 100)); // convert slider value to page number
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!story) return <div>Story not found</div>;

  return (
    <div>
      <h4 className="reader-title">{story.title}</h4>
      <p className="reader-author">{story.author}</p>
      <div className="reader-text" onMouseUp={handleTextSelection}>
        <pre>{pageContent}</pre>

        {/* Comment Controls */}
        {showPopover && (
          <div
            ref={popoverRef}
            className="comment-popover"
            style={{ top: popoverPosition.y, left: popoverPosition.x }}
          >
            <textarea
              className="comment-textarea"
              placeholder="Add a comment"
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="comment-button" onClick={handleSaveComment}>
              Save Comment
            </button>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          className="prev-button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
         <NavigateBeforeIcon/>
        </button>

        <button
          className="next-button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          <NavigateNextIcon/>
        </button>
      </div>

      <div className="page-number">
          <span>{currentPage + 1}</span>
          <span>/{totalPages}</span>
        </div>

      <div className="slider-container">
        {/* Progress Slider */}
        <Slider
          value={progress}
          onChange={handleSliderChange}
          aria-labelledby="progress-slider"
          min={0}
          max={100}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${Math.floor(value)}%`} // Display progress as percentage
          sx={{
            width: '100%', // Set slider to fill the width of its container
            marginTop: 2
          }}
        />
      </div>
    </div>
  );
}
  export default ReaderView;