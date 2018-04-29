import * as React from "react";
import { Picker } from "react-native";
//@ts-ignore
import styled from "styled-components";

const StyledPicker = styled.Picker`
  height: 100;
  width: 40%;
`;

interface RadioProps {
  choices: string[];
  onValueChange(value: string): void;
  value: string;
}

const Radio = ({ choices, onValueChange, value }: RadioProps) => (
  <StyledPicker selectedValue={value} onValueChange={onValueChange}>
    {choices.map((choice: string, index) => (
      <Picker.Item
        key={index}
        label={choice.toLocaleUpperCase()}
        value={choice}
      />
    ))}
  </StyledPicker>
);

export default Radio;
