import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import BetterIonicons from "@bit/santosmarco.react-native.better-ionicons";
import ShopStack from "./stacks/Shop";
import OrdersStack from "./stacks/Orders";
import UserProductsStack from "./stacks/UserProducts";
import { UserScreen } from "../screens";
import * as authActions from "../store/actions/auth";

const Drawer = createDrawerNavigator();

const SideDrawer = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      initialRouteName="Shop"
      drawerContent={(props) => (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
          </DrawerContentScrollView>
          <DrawerItem
            label="Logout"
            icon={({ focused, color, size }) => (
              <BetterIonicons name="log-out" size={size} color={color} />
            )}
            onPress={() => dispatch(authActions.signOut())}
            style={{ marginBottom: 40 }}
            inactiveTintColor="red"
          />
        </View>
      )}
      drawerContentOptions={{ labelStyle: styles.label }}
    >
      {user && (
        <Drawer.Screen
          name="User"
          component={UserScreen}
          options={{
            title: user.username,
            drawerIcon: ({ focused, color, size }) => (
              <BetterIonicons name="person" size={size} color={color} />
            ),
            headerShown: true,
            headerTitleStyle: { fontFamily: "poppins-bold" },
          }}
        />
      )}
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
};

const styles = StyleSheet.create({
  label: {
    fontFamily: "poppins",
  },
});

export default SideDrawer;
