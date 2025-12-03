import { useLocation, useNavigate } from "react-router-dom";
import SandwichPreview from "../components/SandwichPreview";
import "./DevelopmentPage.css";
import SandwichBuilder from "../components/SandwichBuilder";
import { useCallback, useState } from "react";
import type { SandwichSelection } from "../types";
import CodyOverlay from "../components/CodyOverlay";

export default function DevelopmentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

  const finalSentences =
    (location.state as { finalSentences?: string[] })?.finalSentences || [];

  const [selection, setSelection] = useState<SandwichSelection>({
    bread: null,
    glutenFree: false,
    cheese: null,
    meat: null,
    vegetarian: false,
    sauce: null,
    cucumber: false,
    onion: false,
    lettuce: false,
    tomato: false,
    avocado: false,
  });

  const updateSandwich = useCallback((newState: Partial<SandwichSelection>) => {
    setSelection((prev) => ({ ...prev, ...newState }));
  }, []);

  const handleGoToResults = () => {
    navigate("/results", {
      state: {
        finalSentences,
        sandwich: selection,
      },
    });
  };

  return (
    <>
      {showIntro && (
        <CodyOverlay messages={[
          "In der echten Welt würdest du die Anforderungen noch einmal mit dem Stakeholder abgleichen, um sicherzugehen, dass alles so ist, wie sie es sich vorstellen.",
          "Aber hier im Spiel versuchen wir deine Anforderungen jetzt einfach umzusetzen!",
          "Wenn du gerade eine Person in der Nähe hast, die dir helfen kann: Frage sie doch, ob sie die Rolle des Entwicklers übernehmen und das Sandwich zubereiten möchte!",
        ]} onClose={() => setShowIntro(false)} />
      )}

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Phase: Entwicklung</h1>
        <div className="development-layout">
          <div className="dev-section">
            <h2>Anforderungen</h2>
            {finalSentences.length === 0 ? (
              <p>Keine Sätze übertragen.</p>
            ) : (
              <ul className="final-list">
                {finalSentences.map((sentence, i) => (
                  <li key={i} className="final-sentence-item">
                    {sentence}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="dev-section">
            <h2>Zutaten</h2>
            <SandwichBuilder onChange={updateSandwich} />
          </div>

          <div className="dev-section">
            <h2>Sandwich</h2>
            <SandwichPreview selection={selection} />
          </div>

          <button className="go-to-results-button" onClick={handleGoToResults}>
            Weiter zur Bewertung
          </button>
        </div>
      </div>
    </>
  );
}
