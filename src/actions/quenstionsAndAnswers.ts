import { Dispatch } from "redux";

import { ADD_CARD_TO_DECK, CREATE_DECK, GET_DECK, GET_DECKS } from "./types";
import * as API from "../utils/flashcardsAPI";

const getDecks = () => {
  return async (dispatch: Dispatch) => {
    const decks = await API.getDecks;
    dispatch(decks);
  };
};

const getDeck = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const deck = await API.getDeck(id);
      dispatch(deck);
    } catch (error) {
      dispatch({ failure: true });
    }
  };
};
