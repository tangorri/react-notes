import { useState } from "react";

import Authenticate from "./components/Authenticate";
import Notes from "./components/Notes";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const onAuthenticatedChangedHandler = newAuthValue => setAuthenticated(newAuthValue);

  if (authenticated) {
    return (
      <>
        <h1>Application Notes</h1>
        <Notes />
      </>
    )
  } else {
    return (
      <>
        <h1>Application Notes</h1>
        <Authenticate onAuthenticatedChanged={onAuthenticatedChangedHandler} />
      </>
    )
  }
}
