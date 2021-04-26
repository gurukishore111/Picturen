import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

type Props = {
  item: Object;
};

export default function Colors({ item }: Props) {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: item.color,
        marginLeft: 12,
        shadowColor: "gray",
        shadowOffset: { width: 2, height: 0.5 },
        shadowOpacity: 0.28,
        shadowRadius: 12.0,
        elevation: 4,
      }}
    ></View>
  );
}
