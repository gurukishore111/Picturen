import React from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

function SmallCard({ image, info }) {
  function truncate(str, no_words) {
    if (info) {
      return str.split(" ").splice(0, no_words).join(" ");
    }
  }
  return (
    <Container>
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        style={{ position: "absolute", width: "100%", height: "50%", top: 60 }}
      />
      <Image source={{ uri: image }} />
      <TextContainer>
        <Ionicons name="ios-play" color="white" size={24} />
        <Text>
          {" "}
          {info && info.length !== 0
            ? truncate(info, 3)
            : "Landscape image"}{" "}
          ...
        </Text>
      </TextContainer>
    </Container>
  );
}

const Container = styled.View`
  width: 187px;
  height: 120px;
  border-radius: 4px;
  background: white;
  overflow: hidden;
  margin-left: 9px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  z-index: -5;
`;

const Text = styled.Text`
  font-size: 14.5px;
  font-weight: 500;
  color: white;
  padding-left: 7px;
`;

const TextContainer = styled.View`
  position: absolute;
  top: 82px;
  left: 10px;
  flex-direction: row;
  align-items: center;
`;

export default SmallCard;
