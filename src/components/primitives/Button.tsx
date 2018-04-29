//@ts-ignore
import styled from "styled-components";
import * as React from "react";

const Touchable = styled.TouchableOpacity`
  background: ${props => (props.primary ? props.color : "white")};

  width: 90%;
  height: 50px;
  margin: 14px;
  padding: 4px 14px;
  border: 2px solid black;
  border-color: ${props => (props.primary ? "white" : props.color)};
  border-radius: 5;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${props => (props.primary ? "white" : props.color)};
  font-size: 30px;
`;

interface Button {
  title: string;
  onPress: any;
  color: string;
  primary?: boolean;
}

const Button = (props: Button) => {
  const { title, onPress, color, primary } = props;
  return (
    <Touchable {...props} onPress={onPress}>
      {primary && (
        <Text color={color} primary>
          {title}
        </Text>
      )}
      {!primary && <Text color={color}>{title}</Text>}
    </Touchable>
  );
};

export default Button;
