import { StackNavigator } from "react-navigation";
import DecksList from "./screens/DecksList";
import DeckDetail from "./screens/DeckDetail";
import AddCard from "./screens/AddCard";
import AddDeck from "./screens/AddDeck";
import CardDetail from "./screens/CardDetail";

export default StackNavigator(
  {
    DecksList: {
      screen: DecksList,
      navigationOptions: {
        title: "CHOOSE A DECK",
        headerTitleStyle: {
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.deck.title}'s Deck`,
      }),
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        title: "ADD CARD",
      },
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        title: "ADD DECK",
      },
    },
    CardDetail: {
      screen: CardDetail,
      navigationOptions: {
        title: "CARD DETAIL",
      },
    },
  },
  {
    headerMode: "screen",
  }
);
