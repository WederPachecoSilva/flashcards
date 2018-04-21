import * as API from "../utils/flashcardsAPI";
const getDecks = () => {
    return async (dispatch) => {
        const decks = await API.getDecks;
        dispatch(decks);
    };
};
const getDeck = (id) => {
    return async (dispatch) => {
        try {
            const deck = await API.getDeck(id);
            dispatch(deck);
        }
        catch (error) {
            dispatch({ failure: true });
        }
    };
};
