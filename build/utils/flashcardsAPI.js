// android studio emulator
const BASE_URL = "http://10.0.2.2:3001";
export const getDecks = () => {
    return fetch(BASE_URL + "/decks", {
        headers: {
            Authorization: "flashcards-app",
        },
        method: "GET",
    }).then(res => res.json());
};
export const getDeck = (deckId) => {
    return fetch(BASE_URL + "/deck/" + deckId, {
        headers: {
            Authorization: "flashcards-app",
        },
        method: "get",
    }).then(res => res.json());
};
export const addDeck = (deck) => {
    return fetch(BASE_URL + "/deck", {
        headers: {
            Authorization: "flashcards-app",
            "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(deck),
    }).then(res => res.json());
};
export const deleteDeck = (deckId) => {
    return fetch(BASE_URL + "/deck/" + deckId, {
        headers: {
            Authorization: "flashcards-app",
            "Content-Type": "application/json",
        },
        method: "delete",
        body: JSON.stringify(deckId),
    }).then(res => res.json());
};
export const getCardsByDeck = (deckId) => {
    return fetch(BASE_URL + "/cards/" + deckId, {
        headers: {
            Authorization: "flashcards-app",
        },
        method: "get",
    }).then(res => res.json());
};
export const addCard = (deckId, card) => {
    return fetch(BASE_URL + "/card/" + deckId, {
        headers: {
            Authorization: "flashcards-app",
            "Content-Type": "application/json",
        },
        method: "post",
        body: JSON.stringify(card),
    }).then(res => res.json());
};
export const deleteCard = (deckId, cardId) => {
    return fetch(BASE_URL + "/card/" + deckId + "/" + cardId, {
        headers: {
            Authorization: "flashcards-app",
        },
        method: "delete",
    }).then(res => res.json());
};
