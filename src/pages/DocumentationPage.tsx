import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useLocation, useNavigate } from "react-router-dom";
import NotesField from "../components/NotesField";
import SentenceParts from "../components/SentenceParts";
import FinalSentences from "../components/FinalSentences";
import useSentenceBuilder from "../hooks/useSentenceBuilder";
import { sentencePartsData } from "../data/sentencePartsData";
import "./DocumentationPage.css";
import CodyOverlay from "../components/CodyOverlay";
import { useState } from "react";

export default function DocumentationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const notes = (location.state as { notes?: string })?.notes || "";
  const [showIntro, setShowIntro] = useState(true);

  const {
    sentenceParts,
    constructedSentence,
    finalSentences,
    handleDragEnd,
    handleSaveSentence,
    setFinalSentences,
  } = useSentenceBuilder(sentencePartsData);

  const handleDelete = (index: number) => {
    setFinalSentences((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      {showIntro && (
        <CodyOverlay
          messages={[
            "Ein Requirements Engineer bringt die Wünsche der Stakeholder in eine Form, die für Entwickler später leicht verständlich ist.",
            "Nutze jetzt die Satzbausteine, um aus deinen Notizen klare Anforderungen zu schreiben.",
          ]}
          onClose={() => setShowIntro(false)}
        />
      )}

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">
          Phase: Anforderungsdokumentation
        </h1>
        <div className="documentation-layout">
          <NotesField value={notes} readOnly />

          <DragDropContext onDragEnd={handleDragEnd}>
            <SentenceParts parts={sentenceParts} />

            <Droppable
              droppableId="sentence"
              direction="horizontal"
              type="PART"
            >
              {(provided) => (
                <div
                  className="sentence-area"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3>Aktueller Satz</h3>

                  <div className="constructed-sentence">
                    {constructedSentence.map((part, i) => (
                      <Draggable
                        key={part.tempId}
                        draggableId={part.tempId}
                        index={i}
                      >
                        {(provided) => (
                          <span
                            className={`sentence-part category-${part.category}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {part.text}
                          </span>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>

                  <button className="save-button" onClick={handleSaveSentence}>
                    Satz speichern
                  </button>

                  <FinalSentences
                    sentences={finalSentences}
                    onDelete={handleDelete}
                  />
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <button
            className="go-to-dev-button"
            onClick={() =>
              navigate("/development", {
                state: { finalSentences: finalSentences },
              })
            }
          >
            Weiter zur Entwicklung
          </button>
        </div>
      </div>
    </>
  );
}
