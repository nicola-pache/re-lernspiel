import { useState, useEffect, useRef } from "react";
import { chatScript, type ChatMessage, type ChatNode } from "../data/chatData";
import "./ElicitationPage.css";
import { useNavigate } from "react-router-dom";
import NotesField from "../components/NotesField";
import ChatWindow from "../components/ChatWindow";
import CodyOverlay from "../components/CodyOverlay";

export default function AnforderungserhebungPage() {
  const navigate = useNavigate();
  const [currentNode, setCurrentNode] = useState(chatScript.start);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChoiceActive, setIsChoiceActive] = useState(false);
  const hasPlayedRef = useRef(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [notesText, setNotesText] = useState("");
  const [followUpCount, setFollowUpCount] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [stakeholderMoodImage, setStakeholderMoodImage] = useState(
    "/stakeholder/stakeholder_happy.png"
  );

  useEffect(() => {
    if (!hasPlayedRef.current) {
      hasPlayedRef.current = true;
      playMessages(currentNode);
    }
  }, [currentNode]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (followUpCount >= 8) {
      setStakeholderMoodImage("/stakeholder/stakeholder_unhappy.png");
    } else if (followUpCount >= 6) {
      setStakeholderMoodImage("/stakeholder/stakeholder_annoyed.png");
    } else {
      setStakeholderMoodImage("/stakeholder/stakeholder_happy.png");
    }
  }, [followUpCount]);

  const playMessages = async (node: ChatNode) => {
    setIsTyping(true);
    for (const msg of node.messages) {
      await new Promise((res) => setTimeout(res, 1200));
      setMessages((prev) => [...prev, msg]);
    }
    setIsTyping(false);

    if (node.next || node.followUp) {
      setIsChoiceActive(true);
    } else {
      setIsChoiceActive(false);
    }
  };

  const handleChoice = async (choice: "next" | "followUp") => {
    setIsChoiceActive(false);

    if (choice === "followUp") {
      setFollowUpCount((prev) => prev + 1);
    }

    const playerText =
      choice === "next"
        ? currentNode.playerTextNext
        : currentNode.playerTextFollowUp;

    const nextNodeId =
      choice === "next" ? currentNode.next : currentNode.followUp;

    if (!nextNodeId) return;

    if (playerText) {
      const playerMsg: ChatMessage = {
        id: Date.now(),
        sender: "player",
        text: playerText,
      };
      setMessages((prev) => [...prev, playerMsg]);
      await new Promise((res) => setTimeout(res, 800));
    }

    const nextNode = chatScript[nextNodeId];
    setCurrentNode(nextNode);
    await playMessages(nextNode);
  };

  return (
    <>
      {showIntro && (
        <CodyOverlay
          messages={[
            "Ein Requirements Engineer sammelt Wünsche von Stakeholdern.",
            "Stakeholder? Das sind alle, die später mit dem System zu tun haben.",
            "Heute ist dieses System ein Sandwich.",
            "Hör genau zu und notiere rechts alles, was sich der Stakeholder wünscht!",
            "Frag ruhig nach, wenn du mehr Details willst. Aber nicht jede Frage liefert dir wirklich zusätzliche Informationen."
          ]}
          onClose={() => setShowIntro(false)}
        />
      )}

      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Phase: Anforderungserhebung</h1>

        <div className="elicitation-layout">
          <div className="stakeholder-container">
            <img
              src={stakeholderMoodImage}
              alt="Stakeholder"
              className="stakeholder-image"
            />
          </div>

          <div className="chat-section">
            <ChatWindow messages={messages} isTyping={isTyping} />

            {isChoiceActive && (
              <div className="choice-buttons">
                {currentNode.next && (
                  <button
                    onClick={() => handleChoice("next")}
                    className="button next"
                  >
                    Weiter
                  </button>
                )}
                {currentNode.followUp && (
                  <button
                    onClick={() => handleChoice("followUp")}
                    className="button followup"
                  >
                    Nachfragen
                  </button>
                )}
              </div>
            )}
          </div>

          <NotesField value={notesText} onChange={(val) => setNotesText(val)} />

          <button
            className="go-to-docs-button"
            onClick={() =>
              navigate("/documentation", { state: { notes: notesText } })
            }
          >
            Weiter zur Dokumentation
          </button>
        </div>
      </div>
    </>
  );
}
