import { useEffect, useState } from 'react'
import './App.css'

import ArrayLib from './lib/array-lib'

// Gestionnaire d'entités
import { NoteManager } from './api/note-manager'

// Composants
import Counter from './components/Counter'
import Filters from './components/Filters'
import NoteList from './components/NoteList'
import AddNoteForm from './components/AddNoteForm'

function App() {

  // Déclaration des états du composant.
  const [notesRAW, setNotesRAW] = useState([]);
  const [notes, setNotes] = useState([...notesRAW]);
  const [filters, filtersSetter] = useState({ keyword: '' }); // ajouter ici d'autre propriétés pour filter d'autre façons.
  const [authenticated, setAuthenticated] = useState(false);

  let jwt = '';

  // Charger les données dès juste après la création du composant.
  // Comme on fait un appel à un setState pas d'autre chose que de passer par un hook userEffect.
  // Si on faisait un setState dans App() on aurait => setState() => App() => setState (infinite loop!)
  // doc: https://fr.react.dev/reference/react/useEffect
  useEffect(() => {
    console.log('userEffet authenticated? ', authenticated);
    if (!authenticated) return;
    NoteManager.list().then(loadedNotes => {
      setNotesRAW(loadedNotes);
      setNotes(loadedNotes);
    });
  }, [authenticated]);
  // en deuxième arguments, le/le status à surveiller. S'ils changent de valeurs
  // alors la fonction sera

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

  function onLoginFormSubmitHAndler(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password')
      })
    })
      .then(response => response.json())
      .then(data => {
        jwt = data.token;
        NoteManager.token = jwt;
        setAuthenticated(true);
      })
      // catch permet de gérer les erreurs d'une Promise
      .catch(error => window.alert('authentification failed: '))
      ;
  }

  function onSignOutClickHandler(e) {
    setAuthenticated(false);
    NoteManager.token = null
  }

  if (authenticated) {
    return (
      <>
        <h1>Application Notes</h1>
        <button onClick={onSignOutClickHandler}>Sign Out</button>
        <AddNoteForm onNoteAdded={onNoteAddedHandler} />
        <Filters filters={filters} onFilterChanged={onFilterChangedHandler} />
        <Counter notes={notes} />
        <NoteList notes={notes} onRemoveBtn={onRemoveBtnHandler} />
      </>
    )
  } else {
    return (
      <>
        <h3>You must be logged !</h3>
        <form onSubmit={onLoginFormSubmitHAndler}>
          <fieldset>
            <legend>Authentification</legend>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" name="username" />
            <label htmlFor="password">Mot de passe</label>
            <input type="password" name="password" />
            <button type="submit">Se connecter</button>
          </fieldset>
        </form>
      </>
    )
  }
}

export default App;
