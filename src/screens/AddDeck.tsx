import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";

import Container from "../components/primitives/Container";
import Input from "../components/primitives/Input";
import { addDeck } from "../utils/flashcardsAPI";
import Button from "../components/primitives/Button";

interface S {
  title: string;
}

interface P {
  navigation: NavigationScreenProp<NavigationRoute<{}>, {}>;
}

class AddDeck extends React.Component<P, S> {
  state = { title: "" };
  handleInput = title => {
    this.setState({ title });
  };

  submitDeck = async () => {
    try {
      const { title } = this.state;
      await addDeck(title);
      this.props.navigation.navigate("DecksList");
    } catch (error) {
      alert("Sorry, something went wrong!");
    }
  };

  render() {
    const { title } = this.state;

    return (
      <Container>
        <Text style={styles.text}>What is the name of your new deck?</Text>
        <Input
          underlineColorAndroid="transparent"
          value={title}
          onChangeText={this.handleInput}
        />
        <Button
          primary
          color="#00008B"
          title="Submit"
          onPress={this.submitDeck}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 25,
    marginBottom: 10,
    width: "90%",
    textAlign: "center",
  },
});

export default AddDeck;
