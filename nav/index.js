import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import SideDrawer from "./SideDrawer";

const AppNavigator = () => (
  <NavigationContainer>
    <SideDrawer />
  </NavigationContainer>
);

export default AppNavigator;
