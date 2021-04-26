import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { FlatList } from "react-native";
import { uri } from "../utils/helpers";

export default function FullScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const { colorName } = route.params;

  const fetchPhotoByColor = () => {
    fetch(`https://api.unsplash.com/photos/?color=${colorName}`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${uri}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPhotoByColor();
  }, [colorName]);

  return (
    <SafeAreaView
      style={{
        marginTop: Platform.OS !== "ios" && 44,
      }}
    >
      <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "600" }}>
        {colorName}
      </Text>
      <TouchableOpacity
        style={{ position: "absolute", top: 42, left: 20 }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="black" />
      </TouchableOpacity>
      {/* <View style={styles.item}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: data.urls.full }}
        />
      </View> */}
      <FlatList
        numColumns={2}
        style={{
          height: "100%",
          marginTop: 22,
          marginTop: Platform.OS !== "ios" && 44,
        }}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("details", { id: item.id })}
          >
            <View style={styles.item}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={{ uri: item.urls.small }}
              />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("fullScreen", {
                    image: item.urls.full,
                    small: item.urls.small,
                    link: item.links.download,
                  })
                }
                style={{ position: "absolute", top: 152, right: 10 }}
              >
                <MaterialIcons name="fullscreen" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
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
