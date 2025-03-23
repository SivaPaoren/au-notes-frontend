import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthForms from "./components/form.tsx";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AuthForms></AuthForms>
    </>
  );
}

export default App;
