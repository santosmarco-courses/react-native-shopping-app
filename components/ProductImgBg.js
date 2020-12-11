import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { DEFAULT_FONT_SIZE, DEFAULT_SPACING } from "../const/style";
import Title from "./Title";

const ProductImgBg = ({ imageUrl, title }) => {
  return (
    <ImageBackground source={{ uri: imageUrl }} style={styles.imageBg}>
      <View style={styles.titleContainer}>
        <Title bold style={styles.title}>
          {title}
        </Title>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBg: {
    width: "100%",
    height: 250,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: DEFAULT_SPACING,
    paddingBottom: DEFAULT_SPACING * 0.5,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    color: "white",
    fontSize: DEFAULT_FONT_SIZE * 2.5,
  },
});

export default ProductImgBg;
