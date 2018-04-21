import { v4 } from "uuid";
import { Decks } from "./types";

const reactId = v4();
const javascriptId = v4();

export const decks: Decks = {
  [reactId]: {
    id: reactId,
    title: "React",
    cards: [
      {
        id: v4(),
        question: "What is React?",
        answer: "A library for managing user interfaces",
        level: "easy",
        deleted: false,
      },
      {
        id: v4(),
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
        level: "intermediate",
        deleted: false,
      },
    ],
  },
  [javascriptId]: {
    id: javascriptId,
    title: "JavaScript",
    cards: [
      {
        id: v4(),
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
        level: "hard",
        deleted: false,
      },
      {
        id: v4(),
        question: "What is the difference between call and apply?",
        answer:
          'With "call" you pass the arguments one by one but with "apply" you pass it as an array instead.',
        level: "intermediate",
        deleted: false,
      },
      {
        id: v4(),
        question:
          "How many differente values can have a boolean type variable?",
        answer: "Two Differente types, true or false.",
        level: "easy",
        deleted: false,
      },
    ],
  },
};

export const multipleChoice = {};
