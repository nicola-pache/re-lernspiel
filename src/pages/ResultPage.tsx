import { useLocation } from "react-router-dom";
import type { SandwichSelection } from "../types";
import SandwichPreview from "../components/SandwichPreview";
import "./ResultsPage.css";

type ResultsState = {
  finalSentences?: string[];
  sandwich?: SandwichSelection;
};

export default function ResultsPage() {
  const location = useLocation();

  const state = (location.state ?? {}) as ResultsState;

  const finalSentences: string[] = state.finalSentences ?? [];
  const sandwich: SandwichSelection | null = state.sandwich ?? null;

  const correctSandwich: SandwichSelection = {
    bread: "Sauerteig",
    glutenFree: false,
    cheese: "Mozzarella",
    meat: "Hähnchenstreifen",
    vegetarian: true,
    sauce: "Honig-Senf",
    cucumber: true,
    onion: false,
    lettuce: true,
    tomato: false,
    avocado: false,
  };

  const keys = Object.keys(correctSandwich) as (keyof SandwichSelection)[];
  const differences: (keyof SandwichSelection)[] = sandwich
    ? keys.filter((k) => sandwich[k] !== correctSandwich[k])
    : keys.slice();

  const ingredientNames: Record<keyof SandwichSelection, string> = {
    bread: "Brot",
    glutenFree: "glutenfrei",
    cheese: "Käse",
    meat: "Aufschnitt",
    vegetarian: "vegetarisch",
    sauce: "Soße",
    cucumber: "Gurke",
    onion: "Zwiebel",
    lettuce: "Salat",
    tomato: "Tomate",
    avocado: "Avocado",
  };

  const requirementGroups = [
    {
      id: "bread",
      label: "Sauerteigbrot",
      variants: [
        "Das Sandwich soll Sauerteigbrot enthalten.",
        "Das Sandwich muss Sauerteigbrot enthalten.",
      ],
    },
    {
      id: "glutenfree",
      label: "nicht glutenfrei",
      variants: ["Das Sandwich muss nicht glutenfrei sein."],
    },
    {
      id: "vegetarian",
      label: "vegetarisch",
      variants: [
        "Das Sandwich soll vegetarisch sein.",
        "Das Sandwich muss vegetarisch sein.",
      ],
    },
    {
      id: "green-besides-avocado",
      label: "grüne Zutaten außer Avocado",
      variants: [
        "Das Sandwich soll grüne Zutaten enthalten außer Avocado.",
        "Das Sandwich muss grüne Zutaten enthalten außer Avocado.",
        "Das Sandwich soll nicht Avocado enthalten.",
      ],
    },
    {
      id: "sauce-honey-mustard",
      label: "Honig-Senf-Soße",
      variants: [
        "Das Sandwich soll Honig-Senf-Soße enthalten.",
        "Das Sandwich muss Honig-Senf-Soße enthalten.",
      ],
    },
    {
      id: "cheese-mozzarella",
      label: "Mozzarella-Käse",
      variants: [
        "Das Sandwich soll Mozzarella-Käse enthalten.",
        "Das Sandwich muss Mozzarella-Käse enthalten.",
      ],
    },
    {
      id: "meat-chicken-vegetarian",
      label: "vegetarische Hühnchenstreifen",
      variants: [
        "Das Sandwich soll vegetarische Hähnchenstreifen enthalten.",
        "Das Sandwich muss vegetarische Hähnchenstreifen enthalten.",
        "Das Sandwich soll vegetarische Hähnchenstreifen enthalten falls verfügbar.",
        "Das Sandwich muss vegetarische Hähnchenstreifen enthalten falls verfügbar.",
      ],
    },
  ];

  const allCorrectVariants = requirementGroups.flatMap((g) => g.variants);

  const comparison = finalSentences.map((sentence) => ({
    text: sentence,
    correct: allCorrectVariants.includes(sentence),
  }));

  const satisfiedGroups = requirementGroups.filter((group) =>
    group.variants.some((v) => finalSentences.includes(v))
  );

  const missingGroups = requirementGroups.filter(
    (group) => !group.variants.some((v) => finalSentences.includes(v))
  );

  const correctIngredientCount = keys.length - differences.length;

  return (
    <div className="results-layout">
      <div className="results-left">
        <h2>Dein Sandwich</h2>

        {sandwich ? (
          <>
            <SandwichPreview selection={sandwich} />

            <div className="principle-unlocked">
              <h3>Freigeschaltet: Grundprinzip 1 – Wertorientierung</h3>
              <p>
                Ein System gilt als erfolgreich, wenn es konkrete Bedürfnisse
                der Stakeholder adressiert und ihnen einen erkennbaren Mehrwert
                bietet.
              </p>
            </div>
          </>
        ) : (
          <p>Kein Sandwich übergeben.</p>
        )}
      </div>

      <div className="results-right">
        <section>
          <h2>Vergleich der Anforderungen</h2>
          <p className="summary-text">
            {satisfiedGroups.length} von {requirementGroups.length}{" "}
            Anforderungen erfüllt
          </p>

          {missingGroups.length > 0 && (
            <div className="missing-reqs">
              <h3>Fehlende Anforderungen:</h3>
              <ul>
                {missingGroups.map((g) => (
                  <li key={g.id}>{g.label}</li>
                ))}
              </ul>
            </div>
          )}
          <ul className="results-list">
            {comparison.map((item, i) => (
              <li key={i} className={item.correct ? "correct" : "incorrect"}>
                {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Fehleranalyse Sandwich</h2>
          <p className="summary-text">
            {correctIngredientCount} von {keys.length} richtig
          </p>

          {differences.length === 0 ? (
            <p>
              Perfekt! Dein Sandwich entspricht allen Anforderungen des
              Stakeholders!
            </p>
          ) : (
            <ul className="results-differences">
              {differences.map((key) => (
                <li key={key}>
                  <strong>{ingredientNames[key]}</strong> ist falsch gewählt.
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
