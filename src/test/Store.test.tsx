import {expect, test, beforeEach} from 'vitest';
import useNoteStore from '../store/store';

// Réinitialiser le store avant chaque test
beforeEach(() => {
    useNoteStore.setState({notes: []});
});

test('addNote ajoute une nouvelle note au store', () => {
    const {addNote} = useNoteStore.getState();
    addNote({
        id: 1,
        title: 'Math',
        score: 16,
        comment: 'Good performance',
        date: '01/01/2022',
    });

    const notes = useNoteStore.getState().notes;
    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({
        id: 1,
        title: 'Math',
        score: 16,
        comment: 'Good performance',
        date: '01/01/2022',
    });
});

test('deleteNote supprime une note du store', () => {
    const {addNote, deleteNote} = useNoteStore.getState();
    addNote({
        id: 1,
        title: 'Math',
        score: 16,
        comment: 'Good performance',
        date: '01/01/2022',
    });
    deleteNote(1);

    const notes = useNoteStore.getState().notes;
    expect(notes).toHaveLength(0);
});

test('updateNote modifie une note existante dans le store', () => {
    const {addNote, updateNote} = useNoteStore.getState();
    addNote({
        id: 1,
        title: 'Math',
        score: 16,
        comment: 'Good performance',
        date: '01/01/2022',
    });
    updateNote(1, {
        id: 1,
        title: 'Math',
        score: 17,
        comment: 'Excellent performance',
        date: '01/01/2022',
    });

    const notes = useNoteStore.getState().notes;
    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({
        id: 1,
        title: 'Math',
        score: 17,
        comment: 'Excellent performance',
        date: '01/01/2022',
    });
});

test('updateNote ne modifie pas les autres notes', () => {
    const {addNote, updateNote} = useNoteStore.getState();
    addNote({
        id: 1,
        title: 'Math',
        score: 16,
        comment: 'Good performance',
        date: '01/01/2022',
    });
    addNote({
        id: 2,
        title: 'History',
        score: 7,
        comment: 'Poor performance',
        date: '01/01/2022',
    });
    updateNote(1, {
        id: 1,
        title: 'Math',
        score: 17,
        comment: 'Excellent performance',
        date: '01/01/2022',
    });

    const notes = useNoteStore.getState().notes;
    expect(notes).toHaveLength(2);
    expect(notes[1]).toMatchObject({
        id: 2,
        title: 'History',
        score: 7,
        comment: 'Poor performance',
        date: '01/01/2022',
    });
});

test('updateNote ne modifie pas la note si l\'ID ne correspond pas', () => {
    const {addNote, updateNote} = useNoteStore.getState();
    addNote({
        id: 1,
        title: 'Math',
        score: 16,
        comment: 'Good performance',
        date: '01/01/2022',
    });
    updateNote(2, {
        id: 2,
        title: 'History',
        score: 7,
        comment: 'Poor performance',
        date: '01/01/2022',
    });

    const notes = useNoteStore.getState().notes;
    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({
        id: 1,
        title: 'Math',
        score: 16,
        comment: 'Good performance',
        date: '01/01/2022',
    });
});
