import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Linking } from "react-native";
import { uri } from "../utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MedCard from "../components/MedCard/MedCard";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native-expo-image-cache";
import { NavigationParams } from "react-navigation";
import { Data } from "../screen/HomeScreen";

function ImageScreen({
  route,
  navigation,
}: {
  route: NavigationParams;
  navigation: NavigationParams;
}) {
  const { id } = route.params;
  const [data, setData] = useState<Data[]>();
  const [related, setRelated] = useState<Data[]>();

  const fetchImageById = () => {
    fetch(`https://api.unsplash.com/photos/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${uri}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        if (data.related_collections.length !== 0)
          setRelated(data.related_collections);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (id) {
      fetchImageById();
    }
  }, [id]);

  function captiFirst(name: string) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return (
    <View>
      <ScrollView>
        {data && (
          <>
            <Image
              style={styles.image}
              preview={{ uri: data.urls.small }}
              tint="light"
              uri={data.urls.regular}
            />
            <TouchableOpacity
              style={{ position: "absolute", top: 42, left: 20 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(data.links.download);
              }}
              style={{ position: "absolute", top: 42, right: 20 }}
            >
              <Ionicons name="arrow-down-circle" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: "absolute", top: 42, right: 90 }}
              onPress={() =>
                navigation.navigate("fullScreen", {
                  image: data.urls.full,
                  small: data.urls.small,
                  link: data.links.download,
                })
              }
            >
              <MaterialIcons name="fullscreen" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
              {data.description && (
                <Text style={styles.title}>{captiFirst(data.description)}</Text>
              )}
              {data.alt_description && (
                <Text style={styles.title}>
                  {captiFirst(data.alt_description)}
                </Text>
              )}
              <Text style={styles.color}>Color</Text>
              <View
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: data.color,
                  margin: 6,
                  borderRadius: 15,
                }}
              ></View>
              <Text style={styles.color}>{data.color}</Text>
              <Text style={styles.title}>You May like this</Text>
              <ScrollView
                horizontal
                style={{ marginTop: 20, marginLeft: -10 }}
                showsHorizontalScrollIndicator={false}
              >
                {related &&
                  related.results[0].preview_photos.map((item) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("details", { id: item.id })
                      }
                    >
                      <MedCard image={item.urls.small} key={item.id} />
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  color: {
    color: "grey",
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ImageScreen;
