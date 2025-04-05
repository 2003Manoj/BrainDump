// components/NoteCard.js
import React from 'react';
import styles from '../styles/NoteCard.module.css';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{note.title}</h3>
        <p className={styles.cardDescription}>{note.description}</p>
        <p className={styles.cardDate}>{note.createdAt}</p>
      </div>
      <div className={styles.cardActions}>
        <button 
          className={styles.editBtn}
          onClick={() => onEdit(note)}
        >
          Edit
        </button>
        <button 
          className={styles.deleteBtn}
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;