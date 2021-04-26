import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ImageBackground,
  Linking,
} from "react-native";
import { FlatList } from "react-native";
import { uri } from "../utils/helpers";
import { Image } from "react-native-expo-image-cache";
import { NavigationParams } from "react-navigation";

export default function FullScreenImage({
  navigation,
  route,
}: {
  navigation: NavigationParams;
  route: NavigationParams;
}) {
  const { image, small, link } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        uri={image}
        style={{ flex: 1 }}
        resizeMode="cover"
        tint="light"
        preview={{ uri: small }}
      />
      <TouchableOpacity
        style={{ position: "absolute", top: 62, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(link);
        }}
        style={{ position: "absolute", top: 62, right: 20 }}
      >
        <Ionicons name="arrow-down-circle" size={30} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 4,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 8,
    marginHorizontal: 5,
    width: 180,
    height: 200,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    padding: 5,
    marginBottom: 6,
    marginTop: 6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "orange",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 12,
  },
});
