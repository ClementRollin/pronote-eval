import create from 'zustand';
import { Note } from '../type/Note';

interface NoteState {
    notes: Note[];
    addNote: (note: Note) => void;
    updateNote: (id: number, updatedNote: Partial<Note>) => void;
    deleteNote: (id: number) => void;
}

const useNoteStore = create<NoteState>((set) => ({
    notes: [],
    addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
    updateNote: (id, updatedNote) => set((state) => ({
        notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updatedNote } : note
        ),
    })),
    deleteNote: (id) => set((state) => ({
        notes: state.notes.filter((note) => note.id !== id),
    })),
}));

export default useNoteStore;
