import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FileUploadForm from "./components/uploadForm.tsx";
import NoteGrid from "./components/NoteGrid.tsx";
import AuthForms from "./components/form.tsx";

function App() {
  return (
    <>
      <AuthForms></AuthForms>
      <NoteGrid></NoteGrid>
      <FileUploadForm></FileUploadForm>
    </>
  );
}

export default App;
