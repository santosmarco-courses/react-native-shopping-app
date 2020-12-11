import React from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { nanoid } from "nanoid/async/index.native";
import { useGlobalize } from "react-native-globalize";
import {
  ScreenContainer,
  BodyText,
  Title,
  SectionTitle,
  CartProductCard,
  TouchableNative,
} from "../../components";
import {
  DEFAULT_SPACING,
  DEFAULT_BORDER_RADIUS_SM,
  DEFAULT_FONT_SIZE,
} from "../../const/style";
import { LIGHT, BTNS_PRIMARY } from "../../const/colors";
import * as ordersActions from "../../store/actions/orders";
import * as shopActions from "../../store/actions/shop";

const CartScreen = ({ navigation }) => {
  let { products, cart } = useSelector((state) => state.shop);
  cart = cart
    .map((productInCart) => {
      const product = products.filter((p) => p.id === productInCart.id)[0];
      if (!product) return;
      return { ...productInCart, ...product };
    })
    .filter((p) => p && p.qty > 0);

  const { formatCurrency } = useGlobalize();

  const isCartEmpty =
    cart.length === 0 ||
    cart.reduce((acc, product) => acc + product.qty, 0) === 0;

  const dispatch = useDispatch();

  const calcCartTotal = () => cart.reduce((acc, p) => acc + p.price * p.qty, 0);

  const goShoppingHandler = () => {
    navigation.navigate("Shop");
  };

  const navigateToProductDetails = (productId, productTitle) => {
    navigation.navigate("Product Details", { productId, productTitle });
  };

  const addOrderHandler = async () => {
    const orderId = await nanoid();
    dispatch(ordersActions.addOrder(cart));
    showMessage({
      message: "Order placed!",
      description: `Your order has been placed successfully.\nThank you!`,
      type: "success",
    });
    dispatch(shopActions.emptyCart());
    navigation.navigate("Shop");
  };

  return (
    <View style={{ flex: 1 }}>
      <ScreenContainer
        containerStyle={
          isCartEmpty ? styles.emptyCartContainer : styles.nonEmptyCartContainer
        }
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {isCartEmpty ? (
            <>
              <BodyText>Your cart is unfortunately empty.</BodyText>
              <View style={styles.goShoppingBtn}>
                <Button title="Go shopping" onPress={goShoppingHandler} />
              </View>
            </>
          ) : (
            <View style={styles.contentContainer}>
              <View style={{ flex: 1 }}>
                <View style={styles.cartTotalCard}>
                  <Title style={styles.cartTotalText}>Your Total:</Title>
                  <View style={styles.cartTotalValueContainer}>
                    <Title style={styles.cartTotalUSD}>US$</Title>
                    <Title bold style={styles.cartTotalText}>
                      {formatCurrency(calcCartTotal(products, cart)).replace(
                        "$",
                        ""
                      )}
                    </Title>
                  </View>
                </View>
                <SectionTitle
                  borderless
                  icon={{ iosName: "ios-list", androidName: "md-list" }}
                >
                  Your order
                </SectionTitle>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{ flex: 1 }}
                >
                  <FlatList
                    data={cart}
                    renderItem={({ item }) => (
                      <CartProductCard
                        data={item}
                        onViewDetails={() =>
                          navigateToProductDetails(item.id, item.title)
                        }
                      />
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={styles.itemSeparator} />
                    )}
                  />
                </KeyboardAvoidingView>
              </View>
              <TouchableNative
                containerStyle={styles.placeOrderContainer}
                touchableStyle={{ flex: 0 }}
                onPress={addOrderHandler}
              >
                <View style={styles.placeOrderContent}>
                  <View style={styles.placeOrderBtn}>
                    <Title bold style={styles.placeOrderLabel}>
                      Place Order
                    </Title>
                  </View>
                </View>
              </TouchableNative>
            </View>
          )}
        </TouchableWithoutFeedback>
      </ScreenContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyCartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  nonEmptyCartContainer: {
    justifyContent: "flex-end",
  },
  goShoppingBtn: {
    marginTop: DEFAULT_SPACING,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cartTotalCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderRadius: DEFAULT_BORDER_RADIUS_SM,
    padding: DEFAULT_SPACING * 0.8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "white",
    marginBottom: DEFAULT_SPACING * 1.5,
  },
  cartTotalText: {
    fontSize: DEFAULT_FONT_SIZE * 1.5,
  },
  cartTotalUSD: {
    fontSize: DEFAULT_FONT_SIZE * 1,
    marginRight: DEFAULT_SPACING * 0.3,
  },
  cartTotalValueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  placeOrderContainer: {
    justifyContent: "flex-end",
  },
  placeOrderBtn: {
    alignItems: "center",
    backgroundColor: BTNS_PRIMARY,
    padding: DEFAULT_SPACING,
    borderRadius: DEFAULT_BORDER_RADIUS_SM,
  },
  placeOrderLabel: {
    fontSize: DEFAULT_FONT_SIZE * 1.5,
    color: LIGHT,
  },
  itemSeparator: {
    height: DEFAULT_SPACING * 0.4,
  },
});

export default CartScreen;
