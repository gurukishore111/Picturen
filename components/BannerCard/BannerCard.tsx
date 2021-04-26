import React from "react";
import styled from "styled-components";
import { View, Dimensions, Image, TouchableOpacity } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Data } from "../../screen/HomeScreen";

const screenWidth = Dimensions.get("window").width;

type Props = {
  data: Data[];
};

class BannerCard extends React.Component<Props> {
  _renderItem({ item, index }) {
    return (
      <TouchableOpacity>
        <View style={{ borderRadius: 8, overflow: "hidden" }}>
          <Image
            source={{ uri: item.urls.small }}
            style={{ width: "100%", height: 200 }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container>
        <Carousel
          ref={(c) => (this.carousel = c)}
          data={this.props.data}
          renderItem={this._renderItem}
          itemWidth={326}
          sliderWidth={screenWidth}
          autoplay
          inactiveSlideScale={0.95}
          loop
          //layout={"tinder"}
          // activeAnimationType="timing"
          // activeAnimationOptions={{
          //   friction:4,
          //   tension:40
          // }}
          enableMomentum={true}
          activeSlideAlignment={"start"}
          autoplayInterval={2000}
          autoplayDelay={4000}
          contentContainerCustomStyle={{
            height: 220,
            marginLeft: 10,
          }}
        />
      </Container>
    );
  }
}

const Container = styled.View`
  width: ${screenWidth};
  height: 200px;
  border-radius: 5px;
  background: white;
  overflow: hidden;
`;

export default BannerCard;
