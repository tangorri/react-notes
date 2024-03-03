import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ArrayLib from './lib/array-lib'

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
    setNotes(ArrayLib.remove(notes, noteToDelete));
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
