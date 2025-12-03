import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { Part } from "../types";
import "./SentenceParts.css";

interface Props {
  parts: Part[];
  readOnly?: boolean;
}

export default function SentenceParts({ parts, readOnly = false }: Props) {
  if (readOnly) {
    return (
      <div className="parts-area">
        <h3>Satzbausteine</h3>
        {parts.map((p) => (
          <div key={p.id} className="part-block">
            {p.text}
          </div>
        ))}
      </div>
    );
  }

  return (
    <Droppable droppableId="parts" direction="vertical" type="PART">
      {(provided) => (
        <div
          className="parts-area"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h3>Satzbausteine</h3>

          {parts.map((p, index) => (
            <Draggable key={p.id} draggableId={p.id} index={index}>
              {(provided) => (
                <div
                  className={`part-block category-${p.category}`}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {p.text}
                </div>
              )}
            </Draggable>
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
