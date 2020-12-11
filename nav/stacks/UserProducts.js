import React from "react";
import { StyleSheet, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProducts, UserProductsEdit, UserProductsAdd } from "../../screens";
import { HeaderButton } from "../../components";

const Stack = createStackNavigator();

const UserProductsStack = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => ({
      headerTitleStyle: styles.headerTitle,
    })}
  >
    <Stack.Screen
      name="My Products"
      component={UserProducts}
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
            title="Add"
            iconName={Platform.select({
              ios: "ios-add-circle",
              android: "md-add-circle",
            })}
            onPress={() => navigation.navigate("Add Product")}
          />
        ),
      })}
    />
    <Stack.Screen
      name="Edit Product"
      component={UserProductsEdit}
      options={({ route }) => ({
        headerTitle: `Edit: ${route.params.product.title}`,
      })}
    />
    <Stack.Screen name="Add Product" component={UserProductsAdd} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "poppins-bold",
  },
});

export default UserProductsStack;
