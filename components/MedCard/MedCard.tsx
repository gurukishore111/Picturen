import React from "react";
import styled from "styled-components";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

function MedCard({ image, info }) {
  function truncate(str, no_words) {
    if (info) {
      return str.split(" ").splice(0, no_words).join(" ");
    }
  }

  return (
    <Container>
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
        style={{ position: "absolute", width: "100%", height: "50%", top: 105 }}
      />
      <Image source={{ uri: image }} />
      <TextContainer>
        <FontAwesome
          name="file-picture-o"
          size={20}
          color="white"
          style={{ marginLeft: 4 }}
        />

        {info && (
          <Text>
            {info && info.length !== 0 ? truncate(info, 3) : "Portrait image"}{" "}
            ...
          </Text>
        )}
      </TextContainer>
    </Container>
  );
}

const Container = styled.View`
  width: 147px;
  height: 210px;
  border-radius: 14px;
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
  padding-left: 12px;
  max-width: 115px;
`;

const TextContainer = styled.View`
  position: absolute;
  top: 169px;
  left: 1px;
  flex-direction: row;
  align-items: center;
`;

export default MedCard;
