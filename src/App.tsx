import * as React from "react";
import { AsyncStorage } from "react-native";
import { registerRootComponent } from "expo";

import { initializeData } from "./utils/flashcardsAPI";
import { setLocalNotification } from "./utils/notification";
import Root from "./routes";

//  Disables annoying react's lifecycle deprecation warning in 16.3 minor semver
console.disableYellowBox = true;

class App extends React.Component {
  async componentDidMount() {
    try {
      const stringfiedDecks = await AsyncStorage.getItem("decks");
      if (stringfiedDecks === null) {
        await initializeData();
      }
      setLocalNotification();
    } catch (error) {}
  }

  render() {
    return <Root />;
  }
}

export default registerRootComponent(App);
