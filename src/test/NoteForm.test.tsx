import {render, screen, fireEvent} from '@testing-library/react';
import NoteForm from '../component/NoteForm';
import useNoteStore from '../store/store';
import {beforeEach, expect, test} from "vitest";

beforeEach(() => {
    // Reset the store state before each test
    useNoteStore.setState({notes: []});
});

test('allows user to create a note', () => {
    render(<NoteForm/>);

    fireEvent.change(screen.getByLabelText(/title/i), {target: {value: 'Math'}});
    fireEvent.change(screen.getByLabelText(/score/i), {target: {value: '16'}});
    fireEvent.change(screen.getByLabelText(/comment/i), {target: {value: 'Good performance'}});
    fireEvent.click(screen.getByText(/submit/i));

    const notes = useNoteStore.getState().notes;
    expect(notes).toHaveLength(1);
    expect(notes[0]).toMatchObject({title: 'Math', score: 16, comment: 'Good performance'});
});
