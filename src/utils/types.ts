export interface Card {
  id: string;
  question: string;
  answer: string;
  level: "easy" | "intermediate" | "hard";
  deleted: boolean;
}

export type Cards = Card[];

export interface Deck {
  id: string;
  title: string;
  cards: Card[];
  deleted: boolean;
}

export interface Decks {
  [id: string]: Deck;
}
