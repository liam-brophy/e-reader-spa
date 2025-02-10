import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NoteCard from "./NoteCard";

const Notes = () => {
  const { storyId } = useParams(); // This will capture the :storyId from the URL
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:3001/notes");
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data = await response.json();
        if (storyId) {
          // Filter notes if a specific storyId is provided in the URL
          const filteredNotes = data.filter(note => note.story === storyId);
          setNotes(filteredNotes);
        } else {
          // Display all notes if no specific storyId is provided
          setNotes(data);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [storyId]); // This will re-run when the storyId changes

  if (loading) return <div>Loading notes...</div>;

  if (notes.length === 0) return <div>No notes available for this story</div>;

  return (
    <div>
      <h2>{storyId ? `Notes for Story ${storyId}` : "All Notes"}</h2>
      <div className="notes-container">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} /> // Map each note to NoteCard
        ))}
      </div>
    </div>
  );
};


export default Notes;