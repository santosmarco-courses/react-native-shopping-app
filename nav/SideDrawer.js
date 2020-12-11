import React from "react";
import { Platform, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import ShopStack from "./stacks/Shop";
import OrdersStack from "./stacks/Orders";
import UserProductsStack from "./stacks/UserProducts";

const Drawer = createDrawerNavigator();

const SideDrawer = () => (
  <Drawer.Navigator drawerContentOptions={{ labelStyle: styles.label }}>
    <Drawer.Screen
      name="Shop"
      component={ShopStack}
      options={{
        drawerIcon: ({ focused, color, size }) => (
          <Ionicons
            name={
              Platform.select({ ios: "ios-", android: "md-" }) + "pricetags"
            }
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="Orders"
      component={OrdersStack}
      options={{
        drawerIcon: ({ focused, color, size }) => (
          <Ionicons
            name={Platform.select({ ios: "ios-", android: "md-" }) + "cube"}
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Drawer.Screen
      name="My Products"
      component={UserProductsStack}
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons
            name={Platform.select({ ios: "ios-", android: "md-" }) + "person"}
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Drawer.Navigator>
);

const styles = StyleSheet.create({
  label: {
    fontFamily: "poppins",
  },
});

export default SideDrawer;
