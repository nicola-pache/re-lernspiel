import { useState } from "react";
import "./CodyOverlay.css";

type Props = {
  messages: string[];
  onClose?: () => void;
};

export default function CodyOverlay({ messages, onClose }: Props) {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < messages.length - 1) {
      setIndex(index + 1);
    } else {
      onClose?.();
    }
  };

  return (
    <div className="cody-overlay">
      <div className="cody-dialog">
        <img src="/cody/cody1.png" alt="Cody" className="cody-image" />

        <div className="cody-bubble">
          <p>{messages[index]}</p>
        </div>

        <button onClick={handleNext} className="cody-next">
          {index === messages.length - 1 ? "Los geht's!" : "Weiter"}
        </button>
      </div>
    </div>
  );
}
