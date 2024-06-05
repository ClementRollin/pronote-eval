import React, { useState } from 'react';
import useNoteStore from '../store/store';
import { Note } from '../type/Note';
import NoteForm from './NoteForm';
import Modal from "./Modal.tsx";

const NoteList: React.FC = () => {
    const notes = useNoteStore((state) => state.notes);
    const deleteNote = useNoteStore((state) => state.deleteNote);
    const [editingNote, setEditingNote] = useState<Note | null>(null);
    const [viewingNote, setViewingNote] = useState<Note | null>(null);

    const handleEdit = (note: Note) => {
        setEditingNote(note);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this note?')) {
            deleteNote(id);
        }
    };

    const handleView = (note: Note) => {
        setViewingNote(note);
    };

    return (
        <div className={'note-listing'}>
            {editingNote && (
                <NoteForm
                    editingNote={editingNote}
                    onFinishEditing={() => setEditingNote(null)}
                />
            )}
            {notes.map((note) => (
                <div key={note.id} className={`note ${getNoteColor(note.score)}`} onClick={() => handleView(note)}>
                    <h2>{note.title}</h2>
                    <p>{note.date}</p>
                    <p>{note.score}/20</p>
                    <p>{note.comment.substring(0, 20)}...</p>
                </div>
            ))}
            {viewingNote && (
                <Modal isOpen={!!viewingNote} onClose={() => setViewingNote(null)}>
                    <h2>{viewingNote.title}</h2>
                    <p>{viewingNote.date}</p>
                    <p>{viewingNote.score}</p>
                    <p>{viewingNote.comment}</p>
                    <button onClick={() => handleEdit(viewingNote)}>Edit</button>
                    <button onClick={() => handleDelete(viewingNote.id)}>Delete</button>
                </Modal>
            )}
        </div>
    );
};

const getNoteColor = (score: number) => {
    if (score < 8) return 'red';
    if (score < 10) return 'orange';
    if (score < 13) return 'yellow';
    return 'green';
};

export default NoteList;
