import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/HomeScreen";
import Svg, { Path } from "react-native-svg";
import { isIphoneX } from "react-native-iphone-x-helper";
import { Ionicons } from "@expo/vector-icons";
import CardScreen from "../screen/CardScreen";
import SearchScreen from "../screen/SearchScreen";

const BottomTab = createBottomTabNavigator();

const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  var isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
          <View style={{ flex: 1, backgroundColor: "#FFF" }}></View>
          <Svg width={75} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={"#FFF"}
            />
          </Svg>
          <View style={{ flex: 1, backgroundColor: "#FFFF" }}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: "#FFF",
          }}
          onPress={onPress}
        >
          {children}
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: 60,
          backgroundColor: "#FFF",
        }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
};
const CustomTabBar = (props) => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 30,
            backgroundColor: "#FFF",
          }}
        ></View>
        <BottomTabBar {...props.props} />
      </View>
    );
  } else {
    return <BottomTabBar {...props.props} />;
  }
};

function MyTabs() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
      tabBar={(props) => <CustomTabBar props={props} />}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="ios-home"
              size={30}
              color={focused ? "#f24e1f" : "gray"}
              style={{
                width: 35,
                height: 35,
                top: 2,
                left: 2,
                tintColor: focused ? "#f24e1f" : "gray",
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <BottomTab.Screen
        name="Trending"
        component={CardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            // <Image
            //   source={icons.search}
            //   resizeMode="contain"
            //   style={{
            //     width: 25,
            //     height: 25,
            //     tintColor: focused ? "#f24e1f" : "gray",
            //   }}
            // />
            <Ionicons
              name="md-albums-outline"
              size={30}
              color={focused ? "#f24e1f" : "gray"}
              style={{
                width: 35,
                height: 35,
                top: 2,
                left: 2,
                tintColor: focused ? "#f24e1f" : "gray",
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="md-search-circle-outline"
              size={30}
              color={focused ? "#f24e1f" : "gray"}
              style={{
                width: 35,
                height: 35,
                top: 2,
                left: 2,
                tintColor: focused ? "#f24e1f" : "gray",
              }}
            />
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default MyTabs;
