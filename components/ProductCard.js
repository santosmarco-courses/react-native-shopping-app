import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { DEFAULT_BORDER_RADIUS_SM, DEFAULT_SPACING } from "../const/style";
import AddToCartBtn from "./AddToCartBtn";
import PriceTag from "./PriceTag";
import Title from "./Title";
import TouchableNative from "./TouchableNative";

const ProductCard = ({
  id,
  title,
  imageUrl,
  price,
  onCardPress,
  CustomButtonComponent,
  disableClickOnCard,
}) => {
  let ContainerComponent = disableClickOnCard ? View : TouchableNative;

  return (
    <ContainerComponent
      style={disableClickOnCard && styles.container}
      containerStyle={!disableClickOnCard && styles.container}
      onPress={!disableClickOnCard && onCardPress}
    >
      <View style={styles.card}>
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: imageUrl }} style={styles.thumbnail} />
        </View>
        <View style={styles.content}>
          <View style={styles.info}>
            <Title bold>{title}</Title>
            <PriceTag price={price} />
          </View>
          {CustomButtonComponent ? (
            <CustomButtonComponent />
          ) : (
            <AddToCartBtn productId={id} productTitle={title} />
          )}
        </View>
      </View>
    </ContainerComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: DEFAULT_BORDER_RADIUS_SM,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: {
    flexDirection: "row",
  },
  thumbnailContainer: {
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    marginRight: DEFAULT_SPACING * 0.2,
  },
  thumbnail: {
    height: 75,
    width: 75,
    borderTopLeftRadius: DEFAULT_BORDER_RADIUS_SM,
    borderBottomLeftRadius: DEFAULT_BORDER_RADIUS_SM,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: DEFAULT_SPACING * 0.4,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default ProductCard;
