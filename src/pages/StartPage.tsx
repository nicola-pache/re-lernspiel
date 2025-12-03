import { Link } from "react-router-dom";
import "./StartPage.css";

export default function StartPage() {
  return (
    <div className="start-container">
      <div className="start-content">
        {/* Maskottchen */}
        <img
          src="/cody/cody2.png"
          alt="Maskottchen Cody"
          className="start-mascot"
        />

        <h1 className="start-title">Willkommen zum Requirements Engineering Lernspiel</h1>
        <p className="start-subtitle">Lerne die grundlegenden Prinzipien und Abläufe des Requirements Engineering</p>

        <Link to="/elicitation" className="start-button">
          Spiel starten
        </Link>
      </div>
    </div>
  );
}
