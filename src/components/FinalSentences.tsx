import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FinalSentences.css";

interface Props {
  sentences: string[];
  onDelete: (index: number) => void;
}

export default function FinalSentences({ sentences, onDelete }: Props) {
  return (
    <div className="final-sentences">
      <h3>Gespeicherte Anforderungen</h3>
      <ul>
        {sentences.map((s, i) => (
          <li key={i} className="final-sentence-item">
            <span>{s}</span>
            <button className="delete-button" onClick={() => onDelete(i)}>
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
