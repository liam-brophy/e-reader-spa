import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReaderView = () => {
  const { storyId } = useParams();
  const [story, setStory] = useState(null);
  const [storyContent, setStoryContent] = useState("");
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h1>{story.title}</h1>
      <p>{story.author}</p>
      <pre>{storyContent}</pre> //Pre is for preformatted text! rather than css restyling manually
    </div>
  );
};

export default ReaderView;