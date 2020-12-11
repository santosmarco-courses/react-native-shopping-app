import React, { useState, useRef } from "react";
import { StyleSheet, Button, View, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import Title from "./Title";
import PriceTag from "./PriceTag";
import BodyText from "./BodyText";
import TouchableNative from "./TouchableNative";
import {
  DEFAULT_BORDER_RADIUS_SM,
  DEFAULT_SPACING,
  DEFAULT_FONT_SIZE,
} from "../const/style";
import * as shopActions from "../store/actions/shop";
import { DARK, LIGHT, BTNS_PRIMARY } from "../const/colors";

const CartProductCard = ({ data, onViewDetails }) => {
  const [textInputQty, setTextInputQty] = useState(data.qty.toString());
  const [textInputIsFocused, setTextInputIsFocused] = useState(false);

  const textInputRef = useRef();

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(shopActions.addToCart(data.id));
  };

  const removeFromCartHandler = () => {
    if (data.qty === 1) {
      showMessage({
        message: "Removed from cart!",
        description: `${data.title} has been removed from the cart.`,
        type: "warning",
      });
    }
    dispatch(shopActions.removeFromCart(data.id));
  };

  const modifyQtyInCartHandler = (event) => {
    const newQty = parseInt(event.nativeEvent.text);
    if (newQty === 0) {
      showMessage({
        message: "Removed from cart!",
        description: `${data.title} has been removed from the cart.`,
        type: "warning",
      });
    }
    dispatch(shopActions.modifyQtyInCart(data.id, newQty));
  };

  return (
    <TouchableNative containerStyle={styles.container} onPress={onViewDetails}>
      <View style={styles.card}>
        <View style={styles.productContainer}>
          <View style={styles.thumbnailContainer}>
            <Image source={{ uri: data.imageUrl }} style={styles.thumbnail} />
          </View>
          <View style={styles.infoContainer}>
            <Title bold>{data.title}</Title>
            <PriceTag price={data.price} fontSizeMult={0.85} />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableNative
            onPress={removeFromCartHandler}
            touchableStyle={{ justifyContent: "center" }}
          >
            <View
              style={{
                backgroundColor: DARK,
                height: "80%",
                justifyContent: "center",
                alignItems: "center",
                width: 35,
                borderRadius: DEFAULT_BORDER_RADIUS_SM,
              }}
            >
              <Ionicons
                name={Platform.select({
                  ios: "ios-remove-circle",
                  android: "md-remove-circle",
                })}
                size={15}
                color={LIGHT}
              />
            </View>
          </TouchableNative>
          <View style={styles.qtyContainer}>
            <TextInput
              ref={textInputRef}
              value={
                textInputRef.current?.isFocused()
                  ? textInputQty
                  : data.qty.toString()
              }
              onChangeText={(newQty) => setTextInputQty(newQty)}
              onEndEditing={modifyQtyInCartHandler}
              keyboardType="number-pad"
              style={styles.textInput}
              textAlign="center"
            />
          </View>
          <TouchableNative
            onPress={addToCartHandler}
            touchableStyle={{ justifyContent: "center" }}
          >
            <View
              style={{
                backgroundColor: BTNS_PRIMARY,
                height: "80%",
                justifyContent: "center",
                alignItems: "center",
                width: 35,
                borderRadius: DEFAULT_BORDER_RADIUS_SM,
              }}
            >
              <Ionicons
                name={Platform.select({
                  ios: "ios-add-circle",
                  android: "md-add-circle",
                })}
                size={15}
                color={LIGHT}
              />
            </View>
          </TouchableNative>
        </View>
      </View>
    </TouchableNative>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: DEFAULT_BORDER_RADIUS_SM,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
    padding: DEFAULT_SPACING / 2,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productContainer: {
    flexDirection: "row",
  },
  thumbnailContainer: {
    justifyContent: "center",
  },
  thumbnail: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: "#ccc",
    borderWidth: 1,
    marginRight: DEFAULT_SPACING * 0.6,
  },
  infoContainer: {
    justifyContent: "space-between",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyContainer: {
    marginHorizontal: DEFAULT_SPACING * 0.3,
    paddingVertical: DEFAULT_SPACING * 0.7,
    borderRadius: DEFAULT_BORDER_RADIUS_SM,
    borderWidth: 1,
    borderColor: "#ccc",
    height: "80%",
  },
  textInput: {
    width: DEFAULT_SPACING * 2,
    fontFamily: "roboto-bold",
    height: "100%",
  },
});

export default CartProductCard;
