//@ts-check

const clone = require("clone");
const v4 = require("uuid/v4");

const reactId = v4();
const javascriptId = v4();

let db = {};

const defaultData = {
  [reactId]: {
    id: reactId,
    title: "React",
    deleted: false,
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
    deleted: false,
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

function getData(token) {
  let data = db[token];
  if (data == null) {
    data = db[token] = clone(defaultData);
  }
  return data;
}

function getDecks(token) {
  return new Promise(res => {
    let decks = getData(token);
    let keys = Object.keys(decks);
    let decksArr = keys.map(key => decks[key]);
    const result = decksArr.filter(deck => !deck.deleted);
    res(result);
  });
}

function getDeck(token, deckId) {
  return new Promise(res => {
    const decks = getData(token);
    const result = decks[deckId] ? decks[deckId] : {};
    res(result);
  });
}

function addDeck(token, deck) {
  return new Promise(res => {
    let decks = getData(token);
    let keys = Object.keys(decks);
    decks[deck.id] = deck;
    let decksArr = keys.map(key => decks[key]);
    decksArr.push(deck);
    res(decksArr);
  });
}

function deleteDeck(token, deckId) {
  return new Promise(res => {
    let decks = getData(token);
    decks[deckId].deleted = true;
    let decksIds = Object.keys(decks);
    let decksArr = decksIds.map(id => decks[id]);
    let result = decksArr.filter(deck => !deck.deleted);
    res(result);
  });
}

function getCardsByDeck(token, deckId) {
  return new Promise(res => {
    const decks = getData(token);
    const deck = decks[deckId];
    const cards = decks[deckId].cards.filter(card => !card.deleted);
    res(cards);
  });
}

function addCard(token, deckId, card) {
  return new Promise(res => {
    let decks = getData(token);
    decks[deckId].cards.push(card);
    const result = decks[deckId].cards;
    console.log(result);
    res(result);
  });
}

function deleteCard(token, cardId, deckId) {
  return new Promise(res => {
    let decks = getData(token);
    decks[deckId].cards.deleted = true;
    const cards = decks[deckId].cards.filter(card => !card.deleted);

    res(cards);
  });
}

module.exports = {
  getDecks,
  getDeck,
  addDeck,
  deleteDeck,
  getCardsByDeck,
  addCard,
  deleteCard,
};
