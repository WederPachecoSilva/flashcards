import { StackNavigator } from "react-navigation";
import DeckList from "./screens/DeckList";
import DeckDetail from "./screens/DeckDetail";
import AddCard from "./screens/AddCard";
import AddDeck from "./screens/AddDeck";
import CardDetail from "./screens/CardDetail";

export default StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      title: "Deck list",
    },
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      title: "deck detail",
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "add card",
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      title: "add deck",
    },
  },
  CardDetail: {
    screen: CardDetail,
    navigationOptions: {
      title: "carad detail",
    },
  },
});
