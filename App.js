// @ts-check

import React from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

// import { initializeData } from "./build/utils/flashcardsAPI";
import { setLocalNotification } from "./build/utils/notification";
import Root from "./build/routes";

// Disables annoying react's lifecycle deprecation warning in 16.3 minor semver
console.disableYellowBox = true;

class App extends React.Component {
  // Only in case AsyncStorage works
  // async componentDidMount() {
  //   try {
  //     const stringfiedDecks = await AsyncStorage.getItem("decks");
  //     if (stringfiedDecks === null) {
  //       await initializeData();
  //     }
  //   } catch (error) {}
  // }

  render() {
    return <Root />;
  }
}

export default App;
