import { useState } from 'react';

const NoteCard = ({ note, setNotes, stories }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(note.comment);

  const handleEditNote = () => {
    fetch(`http://localhost:3001/notes/${note.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: updatedComment }),
    })
      .then(response => {
        if (response.ok) {
          setNotes(prevNotes =>
            prevNotes.map(n => (n.id === note.id ? { ...n, comment: updatedComment } : n))
          );
          setIsEditing(false);
        } else {
          console.error('Failed to edit the note. Response status:', response.status);
        }
      })
      .catch(error => console.error('Error during PATCH request:', error));
  };

  const handleDeleteNote = (noteId) => {
    console.log(`Deleting note with ID: ${noteId}`);

    fetch(`http://localhost:3001/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          console.log('Note deleted successfully');
          setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
        } else {
          console.error('Failed to delete the note. Response status:', response.status);
        }
      })
      .catch(error => console.error('Error during DELETE request:', error));
  };

  const storyTitle = stories.find(story => story.id === note.story)?.title || "Unknown Story";
  const storyAuthor = stories.find(story => story.id === note.story)?.author || "Unknown Author";
  const truncatedText = note.text.length > 50 ? note.text.slice(0, 50) + "..." : note.text;


  return (
    <div className="notes-container">
      <div className="note-card">

        <div className="note-header">
          <p className="note-story-title">{storyTitle}</p>
          <p className="note-story-author">{storyAuthor}</p>
        </div>

        <div className="note-text">
          <p className="note-page-number">page {note.page} |  "{truncatedText}"</p>
        </div>

        {/* <p><strong>Comment:</strong> {note.comment}</p> */}
        {isEditing ? (
          <>
            <textarea
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            />
            <button onClick={handleEditNote}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <strong>{note.comment}</strong>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </>
        )}
        <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;