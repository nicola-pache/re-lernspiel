import { useEffect, useRef, useState } from "react";
import type { ChatMessage, ChatNode } from "../data/chatData";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isChoiceActive, setIsChoiceActive] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addMessage = (msg: ChatMessage) => setMessages((prev) => [...prev, msg]);

  const playNodeMessages = async (node: ChatNode) => {
    setIsTyping(true);
    for (const msg of node.messages) {
      await new Promise((r) => setTimeout(r, 1200));
      addMessage(msg);
    }
    setIsTyping(false);
    setIsChoiceActive(!!(node.next || node.followUp));
  };

  return {
    messages,
    setMessages,
    isTyping,
    isChoiceActive,
    setIsChoiceActive,
    chatEndRef,
    playNodeMessages,
  };
}
