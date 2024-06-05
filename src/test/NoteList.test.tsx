import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import NoteList from '../component/NoteList';
import useNoteStore from '../store/store';
import { beforeEach, expect, test } from "vitest";

beforeEach(() => {
    // Reset the store state before each test
    useNoteStore.setState({ notes: [] });
});

test('create notes', () => {
    const { addNote } = useNoteStore.getState();
    addNote({
        id: 1,
        title: 'Math',
        score: 16,
        comment: 'Good performance',
        date: '01/01/2022',
    });

    render(<NoteList />);
    expect(screen.getByText(/math/i)).toBeInTheDocument();
    expect(screen.getByText(/01\/01\/2022/i)).toBeInTheDocument();
    expect(screen.getByText(/good performance/i)).toBeInTheDocument();
});

test('create notes with different colors based on score', () => {
    const { addNote } = useNoteStore.getState();
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
        score: 7, // Ajusté pour qu'il soit inférieur à 8
        comment: 'Poor performance',
        date: '01/01/2022',
    });

    render(<NoteList />);
    expect(screen.getByText(/math/i).closest('.note')).toHaveClass('green');
    expect(screen.getByText(/history/i).closest('.note')).toHaveClass('red');
});

test('opens modal with note details on click', async () => {
    const { addNote } = useNoteStore.getState();
    addNote({
        id: 1,
        title: 'History',
        score: 18,
        comment: 'Excellent',
        date: '01/01/2022',
    });

    render(<NoteList />);
    fireEvent.click(screen.getByText(/history/i));

    // Wait for modal to appear
    const modal = await waitFor(() => screen.getByRole('dialog', { name: /note-details/i }));
    expect(modal).toBeInTheDocument();

    const withinModal = within(modal);
    expect(withinModal.getByText(/excellent/i)).toBeInTheDocument();
    expect(withinModal.getByText(/18/i)).toBeInTheDocument();
    expect(withinModal.getByText(/01\/01\/2022/i)).toBeInTheDocument();
});

test('delete note', async () => {
    const { addNote } = useNoteStore.getState();
    addNote({
        id: 1,
        title: 'History',
        score: 18,
        comment: 'Excellent',
        date: '01/01/2022',
    });

    render(<NoteList />);
    fireEvent.click(screen.getByText(/history/i));

    // Wait for modal to appear
    await waitFor(() => screen.getByRole('dialog', { name: /note-details/i }));
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));

    // Wait for the note and modal to be removed
    await waitFor(() => expect(screen.queryByRole('dialog', { name: /note-details/i })).not.toBeInTheDocument());
    expect(screen.queryByText(/history/i)).not.toBeInTheDocument();
});
