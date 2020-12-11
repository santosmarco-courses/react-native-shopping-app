import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import {
  AddToCartBtn,
  BodyText,
  PriceTag,
  ProductImgBg,
  SectionTitle,
} from "../../components";
import { DEFAULT_FONT_SIZE, DEFAULT_SPACING } from "../../const/style";

const ProductDetailsScreen = ({ navigation, route }) => {
  const { id, title, price, imageUrl, description } = useSelector(
    (state) => state.shop.products
  ).filter((product) => product.id === route.params.productId)[0];

  return (
    <View style={styles.screen}>
      <ProductImgBg imageUrl={imageUrl} title={title} />
      <SafeAreaView style={styles.contentContainer}>
        <View style={styles.descriptionContainer}>
          <SectionTitle>Description</SectionTitle>
          <BodyText>{description}</BodyText>
        </View>
        <View style={styles.footer}>
          <PriceTag
            price={price}
            fontSizeMult={2.5}
            containerStyle={styles.priceTag}
          />
          <AddToCartBtn
            productId={id}
            productTitle={title}
            showLabel={price < 1000}
            iconSize={price >= 1000 && DEFAULT_FONT_SIZE * 2.5}
            containerStyle={styles.addToCartContainer}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
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
  contentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  descriptionContainer: {
    padding: DEFAULT_SPACING,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: DEFAULT_SPACING,
    shadowColor: "black",
    elevation: 5,
  },
  priceTag: {
    marginRight: DEFAULT_SPACING,
  },
  addToCartContainer: {
    flex: 1,
  },
});

export default ProductDetailsScreen;
