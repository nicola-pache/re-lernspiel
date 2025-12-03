import type { SandwichSelection } from "../types";
import "./SandwichPreview.css";

export default function SandwichPreview({
  selection,
}: {
  selection: SandwichSelection;
}) {
  const layers: string[] = [];

  if (selection.bread)
    layers.push(`/sandwich/bread_bottom_${selection.bread.toLowerCase()}.png`);

  if (selection.sauce)
    layers.push(`/sandwich/sauce_${selection.sauce.toLowerCase()}.png`);

  if (selection.lettuce) layers.push("/sandwich/salad.png");

  if (selection.cheese)
    layers.push(`/sandwich/cheese_${selection.cheese.toLowerCase()}.png`);

  if (selection.meat)
    layers.push(`/sandwich/meat_${selection.meat.toLowerCase()}.png`);

  if (selection.tomato) layers.push("/sandwich/tomato.png");
  if (selection.avocado) layers.push("/sandwich/avocado.png");
  if (selection.cucumber) layers.push("/sandwich/pickles.png");
  if (selection.onion) layers.push("/sandwich/onions.png");

  if (selection.bread)
    layers.push(`/sandwich/bread_top_${selection.bread.toLowerCase()}.png`);

  return (
    <div className="sandwich-preview">
      {layers.map((src, i) => (
        <img key={i} src={src} className="sandwich-layer" />
      ))}
    </div>
  );
}
