import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Counter from './components/Counter'
import Filters from './components/Filters'
import NoteList from './components/NoteList'
import AddNotForm from './components/AddNoteForm'

function App() {

  const [notes, setNotes] = useState([
    { id: 11, text: "première note" },
    { id: 12, text: "deuxième note" },
    { id: 33, text: "troisième note" }
  ]);

  function onRemoveBtnHandler(noteToDelete) {
    // on garde tous les notes qui ne sont pas celle à supprimer
    const newNotes = notes.filter(note => note.id !== noteToDelete.id);
    // const newNotes = notes.filter(note => note !== noteToDelete);
    setNotes(newNotes);
  }

  return (
    <>
      <h1>Application Notes</h1>
      <Counter notes={notes} />
      <AddNotForm />
      <Filters />
      <NoteList notes={notes}  onRemoveBtn={onRemoveBtnHandler} />
    </>
  )

  // const onListItemClickHandler = (e) => {
  //   console.log(e);
  // }

  // return (
  //   <Fragment>
  //     <NoteList notes={notes} onListItemClick={onListItemClickHandler}></NoteList>
  //   </Fragment>
  // )
}

export default App
