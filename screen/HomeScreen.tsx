import {
  setStatusBarHidden,
  setStatusBarBackgroundColor,
  StatusBar,
} from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styled from "styled-components";
import BannerCard from "./../components/BannerCard/BannerCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "./../components/Colors/Colors";
import { uri } from "../utils/helpers";
import MedCard from "./../components/MedCard/MedCard";
import SmallCard from "./../components/smallCard/SmallCard";
import { NavigationParams } from "react-navigation";

export type Data = {
  id?: string;
  name?: string;
  urls: string;
  description?: string;
  alt_description?: string;
};

export default function HomeScreen({ navigation }: NavigationParams) {
  const [data, setData] = useState<Data[]>([]);
  const [landscape, setLandscape] = useState<Data[]>([]);
  const [portrait, setPortrait] = useState<Data[]>([]);
  const [Squarish, setSquarish] = useState<Data[]>([]);
  const [greet, setGreet] = useState<string>("");

  type Color = {
    id: number;
    color: string;
  };
  const [color, setColor] = useState<Color[]>([
    {
      id: 1,
      color: "black",
    },
    {
      id: 2,
      color: "white",
    },
    {
      id: 3,
      color: "yellow",
    },
    {
      id: 4,
      color: "orange",
    },
    {
      id: 5,
      color: "red",
    },
    {
      id: 6,
      color: "purple",
    },
    {
      id: 7,
      color: "magenta",
    },
    {
      id: 8,
      color: "green",
    },
    {
      id: 9,
      color: "teal",
    },
    {
      id: 10,
      color: "blue",
    },
  ]);

  const fetchPhoto = () => {
    fetch(`https://api.unsplash.com/photos/?per_page=100`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${uri}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };
  const fetchLandscapePhoto = () => {
    fetch(`https://api.unsplash.com/photos/?orientation=landscape`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${uri}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setLandscape(data))
      .catch((err) => console.log(err));
  };
  const fetchPortraitPhoto = () => {
    fetch(`https://api.unsplash.com/photos/?orientation=portrait`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${uri}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPortrait(data))
      .catch((err) => console.log(err));
  };

  const fetchSquarishRandom = () => {
    fetch(
      `https://api.unsplash.com/photos/?per_page=100&orientation=squarish`,
      {
        method: "GET",
        headers: {
          Authorization: `Client-ID ${uri}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setSquarish(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchPhoto();
    fetchLandscapePhoto();
    fetchPortraitPhoto();
    fetchSquarishRandom();
    setGreeting();
  }, []);

  function handleScroll(event: any) {
    if (event.nativeEvent.contentOffset.y > 1) {
      setStatusBarHidden(true, "fade");
    } else {
      setStatusBarHidden(false, "fade");
      setStatusBarBackgroundColor("white", true);
    }
  }

  // console.log(data);
  // console.log("L", landscape);

  const setGreeting = () => {
    const myDate = new Date();
    const hrs = myDate.getHours();

    if (hrs < 12) {
      setGreet("Good Morning");
    } else if (hrs >= 12 && hrs <= 17) {
      setGreet("Good Afternoon");
    } else if (hrs >= 17 && hrs <= 24) {
      setGreet("Good Evening");
    }
  };

  return (
    <Root>
      <ScrollView onScroll={(e) => handleScroll(e)}>
        <Main>
          <Header>
            <MaterialCommunityIcons
              name="crown"
              size={19}
              color="#3eb4f7"
              style={{ position: "absolute", top: 55, left: 14 }}
            />
            <Premium>Get Premium</Premium>
            <AvatorProfile
              source={{
                uri:
                  "https://i.pinimg.com/736x/06/d0/00/06d00052a36c6788ba5f9eeacb2c37c3.jpg",
              }}
            />
            <Title>{greet} Picturen</Title>
            <TouchableOpacity
              style={{ right: 13, position: "absolute", top: 99 }}
              onPress={() => navigation.navigate("Search")}
            >
              <Ionicons
                name="md-search-circle-outline"
                size={40}
                color="gray"
              />
            </TouchableOpacity>
          </Header>
          <View style={{ marginTop: 64 }}>
            <Text>Popular Now</Text>
            <BannerContainer>
              <BannerCard data={data} />
            </BannerContainer>
          </View>
          <Text>Search by Colors</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 19 }}
          >
            {color.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() =>
                  navigation.navigate("color", { colorName: item.color })
                }
              >
                <Colors item={item} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <MedCardContainer>
            <LandscapeText>Desktop Wallpaper</LandscapeText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {landscape &&
                landscape.map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("details", { id: item.id })
                      }
                    >
                      <SmallCard
                        key={item.id}
                        image={item.urls.small}
                        info={item.alt_description}
                      />
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </MedCardContainer>
          <MedCardContainer>
            <LandscapeText>Mobile Wallpaper</LandscapeText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {portrait &&
                portrait.map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("details", { id: item.id })
                      }
                    >
                      <MedCard
                        key={item.id}
                        image={item.urls.small}
                        info={item.alt_description}
                      />
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </MedCardContainer>
          <MedCardContainer>
            <LandscapeText>Squarish Wallpaper</LandscapeText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Squarish &&
                Squarish.map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("details", { id: item.id })
                      }
                    >
                      <MedCard
                        key={item.id}
                        image={item.urls.small}
                        info={item.alt_description}
                      />
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </MedCardContainer>
        </Main>
      </ScrollView>
      <StatusBar style="auto" />
    </Root>
  );
}

const Header = styled.View`
  width: 100%;
  height: 85px;
  background-color: white;
  z-index: 10;
`;

const Main = styled.View`
  flex: 1;
  background-color: white;
`;
const Root = styled.View`
  flex: 1;
`;

const Profile = styled.View`
  position: absolute;
  top: 31px;
  right: 13px;
  width: 35px;
  height: 35px;
  background: #c4c4c4;
  border-radius: 17px;
`;

const BannerContainer = styled.View`
  margin-top: 15px;
`;

const MedCardContainer = styled.View`
  margin-top: 20px;
`;

const AvatorProfile = styled.Image`
  position: absolute;
  top: 55px;
  right: 13px;
  width: 35px;
  height: 35px;
  background: #c4c4c4;
  border-radius: 17px;
`;

const LandscapeText = styled.Text`
  margin-top: -2px;
  margin-left: 12px;
  margin-bottom: 17px;
  color: #18171c;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  font-weight: 700;
`;

const Premium = styled.Text`
  top: 55px;
  left: 39px;
  font-size: 17px;
  color: #3eb4f7;
`;

const Text = styled.Text`
  margin-top: 20px;
  margin-left: 12px;
  color: #18171c;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  font-weight: 700;
`;

const Title = styled.Text`
  top: 70px;
  left: 14px;
  font-size: 23px;
  color: #f24e1f;
  max-width: 190px;
  font-weight: 700;
`;
