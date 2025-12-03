export type PartCategory = "start" | "verb" | "object" | "misc";

export interface Part {
  id: string;
  text: string;
  category: PartCategory;
}

export interface SandwichSelection {
  bread: string | null;
  glutenFree: boolean;
  cheese: string | null;
  meat: string | null;
  vegetarian: boolean;
  sauce: string | null;
  cucumber: boolean;
  onion: boolean;
  lettuce: boolean;
  tomato: boolean;
  avocado: boolean;
}
