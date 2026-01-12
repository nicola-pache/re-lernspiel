import "./NavigationButton.css";

type NavigationButtonProps = {
  onClick: () => void;
  label: string; 
};

export default function NavigationButton({
  onClick,
  label,
}: NavigationButtonProps) {
  return (
    <button className="navigation-button" onClick={onClick}>
      {label}
    </button>
  );
}