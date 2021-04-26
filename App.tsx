import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import ColorScreen from "./screen/ColorImageScreen";
import DetailsScreen from "./screen/DetailsScreen";
import FullScreenImage from "./screen/FullScreen";

LogBox.ignoreAllLogs();

const StackTabs = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StackTabs.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Home"}
      >
        <StackTabs.Screen name="Home" component={Tabs} />
        <StackTabs.Screen name="color" component={ColorScreen} />
        <StackTabs.Screen name="details" component={DetailsScreen} />
        <StackTabs.Screen name="fullScreen" component={FullScreenImage} />
      </StackTabs.Navigator>
    </NavigationContainer>
  );
}
