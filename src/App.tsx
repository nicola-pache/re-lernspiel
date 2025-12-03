import { Routes, Route } from "react-router-dom";
import StartPage from "./pages/StartPage.tsx";
import ResultPage from "./pages/ResultPage";
import ElicitationPage from "./pages/ElicitationPage.tsx";
import DocumentationPage from "./pages/DocumentationPage.tsx";
import DevelopmentPage from "./pages/DevelopmentPage.tsx";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/elicitation" element={<ElicitationPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/development" element={<DevelopmentPage />} />
          <Route path="/results" element={<ResultPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
