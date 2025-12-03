import { useState } from "react";
import type { DropResult } from "@hello-pangea/dnd";
import type { Part } from "../types";

export default function useSentenceBuilder(initialParts: readonly Part[]) {
  const [sentenceParts] = useState(() => initialParts.map((p) => ({ ...p })));
  const [constructedSentence, setConstructedSentence] = useState<
    (Part & { tempId: string })[]
  >([]);
  const [finalSentences, setFinalSentences] = useState<string[]>([]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      if (source.droppableId === "sentence") {
        setConstructedSentence((prev) => {
          const next = [...prev];
          next.splice(source.index, 1);
          return next;
        });
      }
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (
      source.droppableId === "parts" &&
      destination.droppableId === "sentence"
    ) {
      const dragged = sentenceParts[source.index];

      const draggedWithTempId = { ...dragged, tempId: crypto.randomUUID() };

      setConstructedSentence((prev) => {
        const next = [...prev];
        next.splice(destination.index, 0, draggedWithTempId);
        return next;
      });
      return;
    }

    if (
      source.droppableId === "sentence" &&
      destination.droppableId === "sentence"
    ) {
      setConstructedSentence((prev) => {
        const next = [...prev];
        const [moved] = next.splice(source.index, 1);
        next.splice(destination.index, 0, moved);
        return next;
      });
      return;
    }
  };

  const handleSaveSentence = () => {
    if (constructedSentence.length === 0) return;
    const joined = constructedSentence.map((p) => p.text).join(" ") + ".";
    setFinalSentences((prev) => [...prev, joined]);
    setConstructedSentence([]);
  };

  return {
    sentenceParts,
    constructedSentence,
    finalSentences,
    setConstructedSentence,
    setFinalSentences,
    handleDragEnd,
    handleSaveSentence,
  };
}
