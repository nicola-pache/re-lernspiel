import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage } from "../data/chatData";
import "./ChatWindow.css";
import { useEffect, useRef } from "react";

interface ChatWindowProps {
  messages: ChatMessage[];
  isTyping?: boolean;
}

export default function ChatWindow({ messages, isTyping }: ChatWindowProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="chat-window-container">
      <div className="chat-scroll-area">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, x: msg.sender === "player" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`message-wrapper ${msg.sender === "player" ? "right" : "left"}`}
            >
              <div className={`message-bubble ${msg.sender}`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <div className="message-wrapper left">
            <div className="message-bubble stakeholder typing">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
