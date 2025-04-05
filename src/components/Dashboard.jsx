// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/Dashboard.module.css';
import NoteForm from './NoteForm';
import NoteCard from './NoteCard';

const Dashboard = ({ user, onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    // Load notes from localStorage for the current user
    const userNotes = JSON.parse(localStorage.getItem(`notes_${user.email}`)) || [];
    setNotes(userNotes);
  }, [user.email]);

  const saveNotes = (updatedNotes) => {
    localStorage.setItem(`notes_${user.email}`, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const addNote = (note) => {
    const newNote = {
      id: Date.now(),
      title: note.title,
      description: note.description,
      createdAt: new Date().toLocaleString()
    };
    
    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
  };

  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id ? updatedNote : note
    );
    saveNotes(updatedNotes);
    setEditingNote(null);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
  };

  const startEditing = (note) => {
    setEditingNote(note);
  };

  const cancelEditing = () => {
    setEditingNote(null);
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.username}>Welcome, {user.username}</div>
        <button className={styles.logoutBtn} onClick={onLogout}>Logout</button>
      </header>
      
      <div className={styles.content}>
        <NoteForm 
          onSubmit={editingNote ? updateNote : addNote} 
          editingNote={editingNote}
          cancelEditing={cancelEditing}
        />
        
        <div className={styles.notesGrid}>
          {notes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={startEditing}
              onDelete={deleteNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;