import * as React from "react";
//@ts-ignore
import styled from "styled-components";

const Container = styled.View`
  padding-bottom: 12px;
  padding-top: 12px;
  background-color: #ffe4e1;
  border: 1px red solid;
  border-radius: 5;
  width: 90%;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 70px;
`;

const Text = styled.Text`
  color: red;
  text-align: center;
`;

const Alert = props => (
  <Container {...props}>
    <Text>{props.children}</Text>
  </Container>
);

export default Alert;
