import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import Title from "./Title";
import {
  DEFAULT_FONT_SIZE,
  DEFAULT_SPACING,
  DEFAULT_BORDER_RADIUS_SM,
} from "../const/style";
import { DARK, LIGHT } from "../const/colors";

const InCartIndicator = () => {
  const cart = useSelector((state) => state.shop.cart);
  const itemsInCart =
    cart.length === 0 ? 0 : cart.reduce((acc, product) => acc + product.qty, 0);

  return (
    <View style={styles.container}>
      <Title style={styles.content}>{itemsInCart}</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: DARK,
    paddingHorizontal: 10,
    height: 23,
    borderRadius: DEFAULT_BORDER_RADIUS_SM,
    alignItems: "center",
    justifyContent: "center",
    marginRight: DEFAULT_SPACING * 0.3,
  },
  content: {
    fontSize: DEFAULT_FONT_SIZE,
    color: LIGHT,
  },
});

export default InCartIndicator;
