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
  const [pageSize, setPageSize] = useState(2000); // Number of characters per page
  const [totalPages, setTotalPages] = useState(0);
  const [progress, setProgress] = useState(0); // Total number of pages
  const [fontSize, setFontSize] = useState(16);
  const contentRef = useRef(null); // Reference to the content for height calculation

  const popoverRef = useRef(null);


  // ____________data_______________

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

        // sets the total number of pages based on the content length and page size
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





  // ____________COMMENTS_______________

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




  // ____________PAGINATION_______________

  const calculatePagination = () => {
    if (contentRef.current) {
      // Measure height of the content container
      const pageHeight = contentRef.current.clientHeight;

      // Estimate characters per page based on font size
      const charPerLine = Math.floor(pageHeight / fontSize);
      const linesPerPage = 30; // Adjust as needed for your design (estimate number of lines that fit on a page)

      const charsPerPage = charPerLine * linesPerPage;

      setTotalPages(Math.ceil(storyContent.length / charsPerPage));

      // Load content for the first page
      setPageContent(storyContent.slice(0, charsPerPage));
    }
  };

  const increaseFontSize = () => setFontSize((prevSize) => prevSize + 2);
  const decreaseFontSize = () => setFontSize((prevSize) => Math.max(prevSize - 2, 12)); // Minimum size 12px

  // Handle the change in page number
  const changePage = (direction) => {
    const newPage = currentPage + direction;
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      const start = newPage * getCharactersPerPage();
      const end = start + getCharactersPerPage();
      setPageContent(storyContent.slice(start, end));
    }
  };

  const handleSliderChange = (event, newValue) => {
    const newPage = Math.floor((newValue / 100) * totalPages);
    setCurrentPage(newPage);
    const start = newPage * getCharactersPerPage();
    const end = start + getCharactersPerPage();
    setPageContent(storyContent.slice(start, end));
  };
  // Get characters per page based on current font size
  const getCharactersPerPage = () => {
    const pageHeight = contentRef.current ? contentRef.current.clientHeight : 500; // Default height if ref is null
    const charPerLine = Math.floor(pageHeight / fontSize); // Characters per line based on font size
    const linesPerPage = 30; // Adjust lines per page
    return charPerLine * linesPerPage;
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


  useEffect(() => {
    document.documentElement.style.setProperty('--reader-font-size', `${fontSize}px`);
    calculatePagination(); // Recalculate pagination when font size changes
  }, [fontSize]);



  useEffect(() => {
    if (storyContent) {
      const charsPerPage = getCharactersPerPage();
      setTotalPages(Math.ceil(storyContent.length / charsPerPage));
      setPageContent(storyContent.slice(0, charsPerPage)); // Display first page content
    }
  }, [storyContent, fontSize]);

  if (loading) return <div>Loading...</div>;
  if (!story) return <div>Story not found</div>;



  // __________________________________________________________________________________________________

  return (
    <div>
      <div className="running-hed">
        <p className="reader-title">{story.title} | </p>
        <p className="reader-author"> | {story.author}</p>
      </div>

     {/* Font Size Controls */}
      <div className="font-controls">
        <button onClick={decreaseFontSize}>A-</button>
        <button onClick={increaseFontSize}>A+</button>
      </div>

      <div className="reader-text" ref={contentRef}>
        <pre>{pageContent}</pre>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={() => changePage(-1)} disabled={currentPage === 0}>
          <NavigateBeforeIcon />
        </button>

        <button onClick={() => changePage(1)} disabled={currentPage === totalPages - 1}>
          <NavigateNextIcon />
        </button>
      </div>

      <div className="page-number">
        <span>{currentPage + 1}</span> / <span>{totalPages}</span>
      </div>

      <div className="slider-container">
        <Slider
          value={(currentPage / totalPages) * 100}
          onChange={handleSliderChange}
          aria-labelledby="progress-slider"
          min={0}
          max={100}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${Math.floor(value)}%`}
        />
      </div>
    </div>
  );
};

export default ReaderView;