import { useState, useEffect } from "react";
import "./SandwichBuilder.css";
import DropdownButton from "./DropdownButton";
import type { SandwichSelection } from "../types";

export default function SandwichBuilder({
  onChange,
}: {
  onChange: (s: SandwichSelection) => void;
}) {
  const [bread, setBread] = useState<string | null>(null);
  const [glutenFree, setGlutenFree] = useState(false);

  const [cheese, setCheese] = useState<string | null>(null);
  const [meat, setMeat] = useState<string | null>(null);
  const [vegetarian, setVegetarian] = useState(false);

  const [sauce, setSauce] = useState<string | null>(null);

  const [cucumber, setCucumber] = useState(false);
  const [onion, setOnion] = useState(false);
  const [lettuce, setLettuce] = useState(false);
  const [tomato, setTomato] = useState(false);
  const [avocado, setAvocado] = useState(false);

  useEffect(() => {
    onChange({
      bread,
      glutenFree,
      cheese,
      meat,
      vegetarian,
      sauce,
      cucumber,
      onion,
      lettuce,
      tomato,
      avocado,
    });
  }, [
    bread,
    glutenFree,
    cheese,
    meat,
    vegetarian,
    sauce,
    cucumber,
    onion,
    lettuce,
    tomato,
    avocado,
    onChange,
  ]);

  const breadOptions = ["Weißbrot", "Vollkorn", "Sauerteig"];
  const cheeseOptions = ["Gouda", "Cheddar", "Mozzarella"];
  const meatOptions = ["Bacon", "Hähnchenstreifen", "Salami"];
  const sauceOptions = ["Mayonnaise", "Barbecue", "Honig-Senf"];

  return (
    <div className="sandwich-card">
      <div className="ingredient-row">
        <DropdownButton
          label="Brot"
          options={breadOptions}
          onChange={setBread}
        />

        <label className="checkbox-inline">
          <input
            className="styled-checkbox"
            type="checkbox"
            checked={glutenFree}
            onChange={(e) => setGlutenFree(e.target.checked)}
          />{" "}
          glutenfrei
        </label>
      </div>

      <div className="ingredient-row">
        <DropdownButton
          label="Soße"
          options={sauceOptions}
          onChange={setSauce}
        />
      </div>

      <div className="ingredient-row">
        <DropdownButton
          label="Käse"
          options={cheeseOptions}
          onChange={setCheese}
        />
      </div>

      <div className="ingredient-row">
        <DropdownButton
          label="Aufschnitt"
          options={meatOptions}
          onChange={setMeat}
        />
        <label className="checkbox-inline">
          <input
            className="styled-checkbox"
            type="checkbox"
            checked={vegetarian}
            onChange={(e) => setVegetarian(e.target.checked)}
          />{" "}
          vegetarisch
        </label>
      </div>

      <label className="checkbox-row">
        <input
          className="styled-checkbox"
          type="checkbox"
          checked={cucumber}
          onChange={(e) => setCucumber(e.target.checked)}
        />
        <span>Gurke</span>
      </label>

      <label className="checkbox-row">
        <input
          className="styled-checkbox"
          type="checkbox"
          checked={onion}
          onChange={(e) => setOnion(e.target.checked)}
        />
        <span>Zwiebel</span>
      </label>

      <label className="checkbox-row">
        <input
          className="styled-checkbox"
          type="checkbox"
          checked={lettuce}
          onChange={(e) => setLettuce(e.target.checked)}
        />
        <span>Salat</span>
      </label>

      <label className="checkbox-row">
        <input
          className="styled-checkbox"
          type="checkbox"
          checked={tomato}
          onChange={(e) => setTomato(e.target.checked)}
        />
        <span>Tomate</span>
      </label>

      <label className="checkbox-row">
        <input
          className="styled-checkbox"
          type="checkbox"
          checked={avocado}
          onChange={(e) => setAvocado(e.target.checked)}
        />
        <span>Avocado</span>
      </label>
    </div>
  );
}
