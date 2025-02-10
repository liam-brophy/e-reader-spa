
const NoteCard = ({ note }) => {
    return (
      <div className="note-card">
        <p><strong>Story ID:</strong> {note.story}</p>
        <p><strong>Selected Text:</strong> {note.text}</p>
        <p><strong>Comment:</strong> {note.comment}</p>
      </div>
    );
  };
  
  export default NoteCard;