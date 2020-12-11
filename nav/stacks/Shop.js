import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { HeaderButton, InCartIndicator } from "../../components";
import {
  CartScreen,
  ProductDetailsScreen,
  ShopScreen,
  UserProductsAdd,
} from "../../screens";

const Stack = createStackNavigator();

const ShopStack = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => ({
      headerTitleStyle: styles.headerTitle,
    })}
  >
    <Stack.Screen
      name="Shop"
      component={ShopScreen}
      options={({ navigation }) => ({
        headerLeft: () => (
          <HeaderButton
            title="Menu"
            iconName={Platform.select({ ios: "ios-menu", android: "md-menu" })}
            onPress={() => navigation.openDrawer()}
          />
        ),
        headerRight: () => (
          <HeaderButton
            title="Cart"
            iconName={Platform.select({ ios: "ios-cart", android: "md-cart" })}
            onPress={() => navigation.navigate("Cart")}
            RenderLeft={InCartIndicator}
          />
        ),
      })}
    />
    <Stack.Screen
      name="Product Details"
      component={ProductDetailsScreen}
      options={({ navigation, route }) => ({
        headerTitle: route.params.productTitle,
        headerRight: () => (
          <HeaderButton
            title="Cart"
            iconName={Platform.select({ ios: "ios-cart", android: "md-cart" })}
            onPress={() => navigation.navigate("Cart")}
            RenderLeft={InCartIndicator}
          />
        ),
      })}
    />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="Add Product" component={UserProductsAdd} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "poppins-bold",
  },
});

export default ShopStack;
