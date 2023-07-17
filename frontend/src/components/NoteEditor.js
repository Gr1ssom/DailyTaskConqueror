import React, { useState } from 'react';

const NoteEditor = () => {
  const [note, setNote] = useState('');

  const handleSave = () => {
    // Implement the logic to save the note to the server here
    // For example, you can use Axios to make an API request to save the note
    // You might also want to include validation and error handling here
  };

  return (
    <div>
      <h1>Note Editor</h1>
      <textarea
        rows={10}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button
        onClick={handleSave}
        style={{ padding: '8px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}
      >
        Save Note
      </button>
    </div>
  );
};

export default NoteEditor;
