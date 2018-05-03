import { StackNavigator } from "react-navigation";
import DecksList from "./screens/DecksList";
import DeckDetail from "./screens/DeckDetail";
import AddCard from "./screens/AddCard";
import AddDeck from "./screens/AddDeck";
import CardDetail from "./screens/CardDetail";
import QuizzResult from "./screens/QuizzResult";

export default StackNavigator(
  {
    DecksList: {
      screen: DecksList,
      navigationOptions: {
        title: "CHOOSE A DECK",
        headerLeft: null,
        headerTitleStyle: {
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: {
        title: `DECK DETAIL`,
      },
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
    QuizzResult: {
      screen: QuizzResult,
      navigationOptions: {
        title: "RESULT",
        headerLeft: null,
        headerTitleStyle: {
          marginLeft: "auto",
          marginRight: "auto",
        },
      },
    },
  },
  {
    headerMode: "screen",
  }
);
