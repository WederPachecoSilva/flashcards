import styled from "styled-components";
import * as React from "react";
const Touchable = styled.TouchableOpacity`
  background: ${props => (props.primary ? props.color : "white")};

  width: 90%;
  height: 50px;
  margin: 14px;
  padding: 4px 14px;
  border: 2px solid black;
  border-radius: 5;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: black;
  font-size: 30px;
`;

const Button = ({ title, onPress }) => (
  <Touchable onPress={onPress}>
    <Text>{title}</Text>
  </Touchable>
);

export default Button;
