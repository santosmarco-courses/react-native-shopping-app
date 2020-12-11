import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";
import { BTNS_PRIMARY, DARK, LIGHT } from "../const/colors";
import {
  DEFAULT_BORDER_RADIUS_SM,
  DEFAULT_FONT_SIZE,
  DEFAULT_SPACING,
} from "../const/style";
import { addToCart, removeFromCart } from "../store/actions/shop";
import BodyText from "./BodyText";
import TouchableNative from "./TouchableNative";

const AddToCartBtn = ({
  productTitle,
  productId,
  containerStyle,
  showLabel,
  iconSize,
}) => {
  const cart = useSelector((state) => state.shop.cart);
  const isInCart =
    cart.filter((product) => product.id === productId && product.qty > 0)
      .length > 0;
  const quantityEqualsOne =
    cart.filter((p) => p.id === productId).length > 0 &&
    cart.filter((p) => p.id === productId)[0].qty === 1;

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(addToCart(productId));
    showMessage({
      message: "Added to cart!",
      description: `${productTitle} has been successfully added to the cart.`,
      type: "success",
    });
  };

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(productId));
    if (quantityEqualsOne) {
      showMessage({
        message: "Removed from cart!",
        description: `${productTitle} has been removed from the cart.`,
        type: "warning",
      });
    }
  };

  return (
    <TouchableNative
      containerStyle={[
        styles.container,
        isInCart && styles.containerDark,
        containerStyle,
      ]}
      onPress={isInCart ? removeFromCartHandler : addToCartHandler}
    >
      <View style={styles.content}>
        <Ionicons
          name={
            isInCart
              ? Platform.select({
                  ios: "ios-remove-circle",
                  android: "md-remove-circle",
                })
              : Platform.select({
                  ios: "ios-cart",
                  android: "md-cart",
                })
          }
          color={LIGHT}
          size={iconSize || DEFAULT_FONT_SIZE * 1.7}
        />
        {showLabel && (
          <BodyText style={styles.label}>
            {isInCart
              ? quantityEqualsOne
                ? "Remove from Cart"
                : "-1 from Cart"
              : "Add to Cart"}
          </BodyText>
        )}
      </View>
    </TouchableNative>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BTNS_PRIMARY,
    borderRadius: DEFAULT_BORDER_RADIUS_SM,
  },
  containerDark: {
    backgroundColor: DARK,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: DEFAULT_SPACING * 0.8,
  },
  label: {
    color: LIGHT,
    marginLeft: DEFAULT_SPACING * 0.5,
  },
});

export default AddToCartBtn;
