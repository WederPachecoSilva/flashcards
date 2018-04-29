import * as React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

import { initializeData } from "./utils/flashcardsAPI";
import { setLocalNotification } from "./utils/notification";
import Root from "./routes";

//  Disables annoying react's lifecycle deprecation warning in 16.3 minor semver
console.disableYellowBox = true;

class App extends React.Component {
  async componentDidMount() {
    try {
      setLocalNotification();
      await AsyncStorage.clear();
      const stringfiedDecks = await AsyncStorage.getItem("decks");
      if (stringfiedDecks === null) {
        await initializeData();
      }
    } catch (error) {}
  }

  render() {
    return <Root />;
  }
}

export default App;
