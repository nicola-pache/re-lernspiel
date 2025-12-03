import { useState } from "react";
import "./DropdownButton.css";

interface DropdownProps {
  label: string;
  options: string[];
  value?: string | null;
  onChange?: (value: string) => void;
  className?: string;
}

export default function DropdownButton({
  label,
  options,
  value,
  onChange,
  className = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(null);

  const selectedValue = value ?? internalValue;

  function handleSelect(option: string) {
    setInternalValue(option);
    onChange?.(option);
    setIsOpen(false);
  }

  return (
    <div className={`dropdown-container ${className}`}>
      {/* Header */}
      <button
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedValue ?? label}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Options */}
      {isOpen && (
        <div className="dropdown-list">
          {options.map((option) => (
            <button
              key={option}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
