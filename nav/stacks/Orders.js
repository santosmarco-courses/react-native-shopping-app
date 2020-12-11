import React from "react";
import { StyleSheet, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { HeaderButton } from "../../components";
import { OrdersScreen } from "../../screens";

const Stack = createStackNavigator();

const OrdersStack = () => (
  <Stack.Navigator
    screenOptions={({ navigation }) => ({
      headerTitleStyle: styles.headerTitle,
      headerLeft: () => (
        <HeaderButton
          title="Menu"
          iconName={Platform.select({ ios: "ios-menu", android: "md-menu" })}
          onPress={() => navigation.openDrawer()}
        />
      ),
    })}
  >
    <Stack.Screen name="Orders" component={OrdersScreen} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: "poppins-bold",
  },
});

export default OrdersStack;
