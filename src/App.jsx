import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Counter from './components/Counter'
import Filters from './components/Filters'
import NoteList from './components/NoteList'
import AddNoteForm from './components/AddNoteForm'

function App() {

  const [notes, setNotes] = useState([
    { id: 11, text: "première note" },
    { id: 12, text: "deuxième note" },
    { id: 33, text: "troisième note" }
  ]);

  function onRemoveBtnHandler(noteToDelete) {
    // recherche l'index dans le tableau (comparaison par références d'objets)
    const index = notes.indexOf(noteToDelete);
    // on prend une copie des éléments avec index strictement inférieur
    // on prend une copie des elements avec index strictement supérieur
    // on créer un tableau qui concatène la destructuration de ces tableaux
    const newNotes = [...notes.slice(0, index), ...notes.slice(index + 1)];
    // on passe ce nouveau tableau dans le states qui désigne les notes
    setNotes(newNotes);
  }

  function onNoteAddedHandler(newNote) {
    setNotes([...notes, newNote])
  }

  return (
    <>
      <h1>Application Notes</h1>
      <Counter notes={notes} />
      <AddNoteForm onNoteAdded={onNoteAddedHandler} />
      <Filters />
      <NoteList notes={notes}  onRemoveBtn={onRemoveBtnHandler} />
    </>
  )
}

export default App
