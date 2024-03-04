import { Fragment, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ArrayLib from './lib/array-lib'

import Counter from './components/Counter'
import Filters from './components/Filters'
import NoteList from './components/NoteList'
import AddNoteForm from './components/AddNoteForm'

function App() {

  // CECI NE MARCHERA PAS CAR NECESSITE DE RENDRE App() async
  // CE QUI NE SEMBLE PAS PLAIRE A REACT
  // const response = await fetch('http://localhost:3000/notes/');
  // const data = await response.json();
  // console.log('data: ', data);

  // BOUCLE INFINIE, setter dans le constructeur
  // fetch('http://localhost:3000/notes/')
  //   .then(response => response.json())
  //   .then(data => notesRAWSetter(data));

  // const loadNotes = async () => {
  //   const response = await fetch('http://localhost:3000/notes/');
  //   const data = await response.json();
  //   notesRAWSetter(data);
  //   console.log('data: ', data);
  // };

  // loadNotes();

  useEffect(() => {
    fetch('http://localhost:3000/notes/')
    .then(response => response.json())
    .then(data => {
      notesRAWSetter(data);
      setNotes(data);
    });
  }, []);

  const pureNotes = [
    { id: 11, text: "première note" },
    { id: 12, text: "deuxième note" },
    { id: 33, text: "troisième note" }
  ]

  const [notesRAW, notesRAWSetter] = useState([...pureNotes]);

  const [notes, setNotes] = useState([...notesRAW]);

  const [filters, filtersSetter] = useState(
    { keyword: '' }
  );

  function onRemoveBtnHandler(noteToDelete) {
    const noteRawNewValues = ArrayLib.remove(notesRAW, noteToDelete);
    notesRAWSetter(noteRawNewValues);
    updateFiltered(noteRawNewValues);
  }

  function onNoteAddedHandler(newNote) {
    const noteRawNewValues = [...notesRAW, newNote];
    notesRAWSetter(noteRawNewValues);
    updateFiltered(noteRawNewValues)
  }

  function updateFiltered(notes) {
    setNotes([...notes]);
  }

  function onFilterChangedHandler(keyword) {
    console.log('filters: ', keyword)
    filtersSetter({
      keyword: keyword
    });
    if (keyword.length > 0) setNotes(notesRAW.filter(n => n.text.includes(keyword)));
    else setNotes(notesRAW);
  }

  return (
    <>
      <h1>Application Notes</h1>
      <Counter notes={notes} />
      <AddNoteForm onNoteAdded={onNoteAddedHandler} />
      <Filters filters={filters} onFilterChanged={onFilterChangedHandler} />
      <NoteList notes={notes} onRemoveBtn={onRemoveBtnHandler} />
    </>
  )
}

export default App
