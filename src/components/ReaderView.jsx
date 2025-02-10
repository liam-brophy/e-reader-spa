import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReaderView = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [storyContent, setStoryContent] = useState("");
  const [loading, setLoading] = useState(true);

  const [showPopover, setShowPopover] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const [selectedText, setSelectedText] = useState("");
  const [commentText, setCommentText] = useState("");


  useEffect(() => {
    //FETCH DATA
    const fetchStoryData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/stories/${storyId}`);

        if (!response.ok) {
          throw new Error("Story not found");
        }

        const data = await response.json();
        setStory(data);

        const storyResponse = await fetch(data.contentPath);

        if (!storyResponse.ok) {
          throw new Error("Content not found");
        }

        const text = await storyResponse.text();
        setStoryContent(text);

      } catch (error) {
        console.error("Error fetching story content:", error);

      } finally { //finally denotes running after everything else. We want to stop the loading state regardless of outcome!
        setLoading(false);
      }
    };
    fetchStoryData();
  }, [storyId]); //this changes via use Params. When the story id changes, data will fetch again with the new id

  if (loading) return <div>Loading...</div>;

  if (!story) return <div>Story not found</div>;


//getting the users text selection
  const getHighlightedText = () => {
    const selection = window.getSelection();
    return selection ? selection.toString() : "";
  };
//what to do with the users text selection
  const handleTextSelection = () => {
    const text = getHighlightedText();
    if (text) {
      const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
      setPopoverPosition({ x: rect.x, y: rect.y }); //where the Popover will be?
      setSelectedText(text);
      setShowPopover(true);
    }
  };

  const handleSaveComment = async () => {
    const newComment = { text: selectedText, comment: commentText };

    try {
      await fetch(`http://localhost:3000/notes`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      setShowPopover(false);
    } catch (error) {
      console.error("Error saving comment:", error);
    }
  };


  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.author}</p>
      <pre>{storyContent}</pre> //Pre is for preformatted text! rather than css restyling manually
      <div onMouseUp={handleTextSelection}>
      <p>{storyText}</p>
      {showPopover && (
        <div
          style={{
            position: "absolute",
            top: popoverPosition.y,
            left: popoverPosition.x,
            background: "white",
            border: "1px solid black",
            padding: "8px",
          }}
        >
          <textarea
            placeholder="Add a comment"
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleSaveComment}>Save Comment</button>
        </div>
      )}
    </div>
    </div>
  );
};

export default ReaderView;