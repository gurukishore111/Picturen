import React, { Props } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components";
import Carousel from "react-native-snap-carousel";
import { uri } from "../utils/helpers";
import { Image } from "react-native-expo-image-cache";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;

type Props = {
  data: any[];
};

class CardScreen extends React.Component<Props> {
  state = {
    data: [],
  };
  fetchPhoto = () => {
    fetch(`https://api.unsplash.com/photos/?per_page=100`, {
      method: "GET",
      headers: {
        Authorization: `Client-ID ${uri}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ data: data });
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.fetchPhoto();
  }

  _renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View style={{ borderRadius: 10, overflow: "hidden", top: "22%" }}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("details", { id: item.id })
          }
        >
          <Image
            uri={item.urls.small}
            tint="light"
            preview={{ uri: item.urls.small }}
            style={{ width: "100%", height: 520 }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    return (
      <Container>
        <Circle1 />
        <Circle2 />
        <Circle3 />
        <TextView>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>Trending</Text>
        </TextView>
        <SlideContainer>
          <Carousel
            ref={(c) => (this.carousel = c)}
            data={this.state.data}
            renderItem={this._renderItem}
            itemWidth={310}
            sliderWidth={screenWidth}
            autoplay
            inactiveSlideScale={0.85}
            loop
            layout={"tinder"}
            activeAnimationType="timing"
            activeAnimationOptions={{
              friction: 4,
              tension: 40,
            }}
            inactiveSlideShift={20}
            enableMomentum={true}
            activeSlideAlignment={"center"}
            autoplayInterval={2000}
            autoplayDelay={4000}
          />
        </SlideContainer>
      </Container>
    );
  }
}

const Container = styled.View`
flex:1;
justify-content:center;
align-items:center
background:#f7eeeb`;

const SlideContainer = styled.View`
  margin-top: 80px;
  width: ${screenWidth};
  height: 900px;
`;

const Circle1 = styled.View`
  position: absolute;
  width: 682px;
  height: 682px;
  left: -135px;
  top: -119px;
  background: #fad1c3;
  border-radius: 341px;
`;

const Circle2 = styled.View`
  position: absolute;
  width: 606px;
  height: 606px;
  left: -18px;
  top: -221px;
  background: #fff;
  border-radius: 341px;
`;

const Circle3 = styled.View`
  position: absolute;
  width: 323px;
  height: 323px;
  left: 206px;
  top: -119px;
  background: #fad1c3;
  border-radius: 161.5px;
`;

const TextView = styled.View`
  position: absolute;
  width: 150px;
  height: 42px;
  left: 104px;
  top: 78px;
  background: #ffffff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export default CardScreen;
