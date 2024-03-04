import { Fragment, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import ArrayLib from './lib/array-lib'

import Counter from './components/Counter'
import Filters from './components/Filters'
import NoteList from './components/NoteList'
import AddNoteForm from './components/AddNoteForm'
import { NoteManager } from './api/note-manager'

function App() {

  // Ici comme on veut charger les données dès juste
  // après la création du composant. Comme on fait un appel à un setState
  // par d'autre chose que de passer par un hook userEffect.
  // Si on faisait un setState dans App() on aurait => setState() => App() => setState (infinite loop!)
  // doc: https://fr.react.dev/reference/react/useEffect
  useEffect(() => {
    NoteManager.list().then(loadedNotes => {
      notesRAWSetter(loadedNotes);
      setNotes(loadedNotes);
    });
  }, []);
  // le tableau vide fait que nous n'attendons pas qu'un setState précis soit
  // appelé pour déclenché cet effet. Il se déclenchera donc dès que le composant
  // aura été initialisé.

  const [notesRAW, notesRAWSetter] = useState([]);
  const [notes, setNotes] = useState([...notesRAW]);
  const [filters, filtersSetter] = useState({ keyword: '' });

  function onRemoveBtnHandler(noteToDelete) {
    const noteRawNewValues = ArrayLib.remove(notesRAW, noteToDelete);
    notesRAWSetter(noteRawNewValues);
    updateFiltered(noteRawNewValues);
    if (noteToDelete.id) {
      NoteManager
        .remove(noteToDelete.id)
        .then(response => console.log('note supprimé côté serveur'))
        ;
    }
  }

  function onNoteAddedHandler(newNote) {
    const noteRawNewValues = [...notesRAW, newNote];
    notesRAWSetter(noteRawNewValues);
    updateFiltered(noteRawNewValues);
    NoteManager.create(newNote)
      // @workaround Rechargement des notes pour obtenir l'id de la nouvelle note
      .then(() => NoteManager.list())
      .then(data => {
        notesRAWSetter(data);
        setNotes(data);
      })
      ;
  }

  function updateFiltered(notes) {
    setNotes([...notes]);
  }

  function onFilterChangedHandler(keyword) {
    console.log('filters: ', keyword)
    filtersSetter({
      keyword: keyword
    });
    if (keyword.length > 0) setNotes(notesRAW.filter(n => n.text.toLowerCase().includes(keyword.toLowerCase())));
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
