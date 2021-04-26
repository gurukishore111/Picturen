import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { uri } from "../utils/helpers";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

function SearchScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  let strings: string;

  function truncate(str: string, no_words: number) {
    if (str) {
      strings = str.split(" ").splice(0, no_words).join(" ");
    }
    return strings.charAt(0).toUpperCase() + strings.slice(1);
  }

  useEffect(() => {
    // setIsLoading(true);
    // fetch("https://api.unsplash.com/photos/?per_page=100", {
    //   method: "GET",
    //   headers: {
    //     Authorization: `Client-ID ${uri}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setData(response);
    //     // ADD THIS
    //     setFullData(response);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     setError(err);
    //   });
  }, []);

  const handleSearch = (text: string) => {
    //https://api.unsplash.com/search/photos/?query=laptop

    fetch(`https://api.unsplash.com/search/photos/?query=${text}`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${uri}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // ADD THIS
        setData(response);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 18 }}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          //   clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => setQuery(queryText)}
          placeholder="Search"
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: 90,
          }}
        />
        <TouchableOpacity
          style={{ right: 3, position: "absolute", top: -3 }}
          onPress={handleSearch(query)}
        >
          <Ionicons name="md-search-circle-outline" size={40} color="gray" />
        </TouchableOpacity>
      </View>
    );
  }

  const showImage = () => {
    if (query === "") {
      return (
        <Image source={require("../assets/search.png")} resizeMode="center" />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Search Photos</Text>
      {renderHeader()}
      {showImage()}

      <ScrollView>
        {data.length !== 0 &&
          data.results.map((item) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("details", { id: item.id })}
            >
              <View style={styles.listItem}>
                <Image
                  source={{ uri: item.urls.small }}
                  style={styles.coverImage}
                />
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "50%",
                    top: 220,
                    left: 21,
                    borderRadius: 8,
                  }}
                />
                {item && (
                  <Text
                    style={{
                      position: "absolute",
                      maxWidth: 320,
                      fontSize: 20,
                      color: "white",
                      fontWeight: "800",
                      left: 30,
                      top: 380,
                    }}
                  >
                    {truncate(item.alt_description, 4)} ....
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  coverImage: {
    width: 300,
    height: 400,
    borderRadius: 8,
  },
  metaInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10,
  },
});

export default SearchScreen;
