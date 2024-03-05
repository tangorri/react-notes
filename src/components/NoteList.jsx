export default function NoteList({ notes, onRemoveBtn }) {

  // Generation des LI pour chaque note dans notes
  const listNotes = notes.map((note, index) =>
    <li key={index}>{note.text}
      &nbsp;
      <button onClick={(event) => onRemoveBtn(note)}>x</button>
    </li>
  );

  return (
    <>
      <p>A NOTE LIST</p>
      <ul>{listNotes}</ul>
    </>
  )
}
