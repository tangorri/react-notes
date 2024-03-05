import { useState } from "react";

/**
 * Composant responsable de la saisie d'une nouvelle note
 * Une fonction callback pourra être spécifier
 * @param {{ formSubmitCallback: void; }} * une fonction callback
 */
export default function AddNoteForm({ onNoteAdded }) {

  const [newNote, newNoteSetter] = useState({ text: 'nouvelle note' });

  const resetForm = () => {

  }

  // Gestion du SubmitEvent du formulaire
  const onFormSubmitHandler = e => {
    // Le comportement par défaut d'un SubmitEvent
    //serait de recharger la page, on prévient ce comportement.
    e.preventDefault();

    const form = e.target;

    // utilisation de FormData du form qui a été soumis.
    // pour récupérer les valeurs des inputs
    // @url https://developer.mozilla.org/fr/docs/Web/API/FormData
    const formData = new FormData(form);
    const newNote = {
      text: formData.get('text')
    }

    // appel de la call callback en lui fournissant les bonnes valeurs
    onNoteAdded(newNote);

    // reset de l'input
    // formData.set('text', '');
    // newNoteSetter(oldValue => {text: ''});
    form.reset();
  }

  // formulaire non contrôlé. (pas on de onChange)
  // donc on ne place pas d'attributs valus sur les inputs
  // si il faut utiliser onChange sur l'input correspondant
  return (
    // formulaire avec inputs non contrôlés (pas de onChange ni value)
    <form onSubmit={onFormSubmitHandler}>
      <fieldset>
        <legend>Ajouter une note</legend>
        <input name="text" type="text" />
        <input type="submit" value="Ajouter" />
      </fieldset>
    </form>
  )
}
