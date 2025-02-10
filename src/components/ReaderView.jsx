import React, { useEffect, useState, useRef } from "react";
import { useParams} from "react-router-dom";

const ReaderView = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [storyContent, setStoryContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [commentText, setCommentText] = useState("");

  const popoverRef = useRef(null);

  // Fetch story and content
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
      } catch (error) {
        console.error("Error fetching story content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [storyId]);

  // Handle clicks outside popover to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setShowPopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get highlighted text
  const getHighlightedText = () => {
    const selection = window.getSelection();
    return selection ? selection.toString() : "";
  };

  // Handle text selection and display popover
  const handleTextSelection = () => {
    const text = getHighlightedText();
    if (text) {
      const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
      setPopoverPosition({ x: rect.x, y: rect.y });
      setSelectedText(text);
      setShowPopover(true);
    }
  };

  // Save comment
  const handleSaveComment = async () => {
    const newComment = { text: selectedText, comment: commentText, page: 1, story: storyId};
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

  if (loading) return <div>Loading...</div>;
  if (!story) return <div>Story not found</div>;

  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.author}</p>
      <div className="reader-text" onMouseUp={handleTextSelection}>
        <pre>{storyContent}</pre>
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
    </div>
  );
};

export default ReaderView;