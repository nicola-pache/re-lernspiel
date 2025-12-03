import "./NotesField.css";

interface NotesFieldProps {
  value: string;
  onChange?: (newValue: string) => void;
  readOnly?: boolean;
  placeholder?: string;
}

export default function NotesField({
  value,
  onChange,
  readOnly = false,
  placeholder = "Hier kannst du deine Beobachtungen oder Anforderungen notieren...",
}: NotesFieldProps) {
  return (
    <textarea
      className={`notes-field ${readOnly ? "readonly" : ""}`}
      value={value}
      onChange={(e) => !readOnly && onChange?.(e.target.value)}
      readOnly={readOnly}
      placeholder={readOnly ? undefined : placeholder}
    />
  );
}
