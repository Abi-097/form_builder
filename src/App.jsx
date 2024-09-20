import "./App.css";
import Dashboard from "./pages/Dashboard";
import FormBuilder from "./pages/FormBuilder";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form-builder/:formName" element={<FormBuilder />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
