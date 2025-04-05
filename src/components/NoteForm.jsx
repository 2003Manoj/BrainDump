// components/NoteForm.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/NoteForm.module.css';

const NoteForm = ({ onSubmit, editingNote, cancelEditing }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setDescription(editingNote.description);
    } else {
      resetForm();
    }
  }, [editingNote]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) return;
    
    if (editingNote) {
      onSubmit({
        ...editingNote,
        title,
        description,
        updatedAt: new Date().toLocaleString()
      });
    } else {
      onSubmit({ title, description });
    }
    
    resetForm();
  };

  return (
    <div className={styles.noteFormContainer}>
      <h2>{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
      <form className={styles.noteForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter note description"
            required
          />
        </div>
        <div className={styles.formButtons}>
          <button type="submit" className={styles.submitBtn}>
            {editingNote ? 'Update Note' : 'Add Note'}
          </button>
          {editingNote && (
            <button 
              type="button" 
              className={styles.cancelBtn}
              onClick={cancelEditing}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteForm;