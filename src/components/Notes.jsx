import { useEffect, useState } from 'react'

import ArrayLib from '../lib/array-lib'

// Gestionnaire d'entités
import { NoteManager } from '../api/note-manager'

// Composants
import Counter from './Counter'
import Filters from './Filters'
import NoteList from './NoteList'
import AddNoteForm from './AddNoteForm'

function Notes() {

  // Déclaration des états du composant.
  const [notesRAW, setNotesRAW] = useState([]);
  const [notes, setNotes] = useState([...notesRAW]);
  const [filters, filtersSetter] = useState({ keyword: '' }); // ajouter ici d'autre propriétés pour filter d'autre façons.

  // Charger les données dès juste après la création du composant.
  // Comme on fait un appel à un setState pas d'autre chose que de passer par un hook userEffect.
  // Si on faisait un setState dans App() on aurait => setState() => App() => setState (infinite loop!)
  // doc: https://fr.react.dev/reference/react/useEffect
  useEffect(() => {
    NoteManager.list().then(loadedNotes => {
      setNotesRAW(loadedNotes);
      setNotes(loadedNotes);
    });
  }, []);
  // le tableau vide fait que nous n'attendons pas qu'un setState précis soit
  // appelé pour déclenché cet effet. Il se déclenchera donc dès que le composant
  // aura été initialisé.

  function onRemoveBtnHandler(noteToDelete) {
    // mise à jour de l'état
    const noteRawNewValues = ArrayLib.remove(notesRAW, noteToDelete);
    setNotesRAW(noteRawNewValues);
    setNotes(noteRawNewValues);

    // Appel serveur
    if (noteToDelete.id) {
      NoteManager
        .remove(noteToDelete.id)
        .then(response => console.log('note supprimé côté serveur'))
        ;
    }
  }

  function onNoteAddedHandler(newNote) {
    // mise à jour des états
    const noteRawNewValues = [...notesRAW, newNote];
    setNotesRAW(noteRawNewValues);
    setNotes(noteRawNewValues);

    // Appel serveur
    NoteManager.create(newNote)
      // @workaround Rechargement des notes pour obtenir l'id de la nouvelle note
      .then(() => NoteManager.list())
      .then(data => {
        setNotesRAW(data);
        setNotes(data);
      })
      ;
  }

  function onFilterChangedHandler(keyword) {
    filtersSetter({ keyword: keyword });
    if (keyword.length > 0) {
      setNotes(notesRAW.filter(n => n.text.toLowerCase().includes(keyword.toLowerCase())));
    } else {
      setNotes(notesRAW);
    }
  }

  return (
    <>
      <Counter notes={notes} />
      <AddNoteForm onNoteAdded={onNoteAddedHandler} />
      <Filters filters={filters} onFilterChanged={onFilterChangedHandler} />
      <NoteList notes={notes} onRemoveBtn={onRemoveBtnHandler} />
    </>
  )
}

export default Notes;
