import './App.css';
import NoteForm from './component/NoteForm';
import NoteList from './component/NoteList';

function App() {
    return (
        <div>
            <header>
                <h1>Pronote</h1>
            </header>
            <main>
                <NoteForm />
                <NoteList />
            </main>
        </div>
    );
}

export default App;
