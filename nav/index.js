import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import SideDrawer from "./SideDrawer";
import AuthStack from "./stacks/Auth";

const AppNavigator = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <NavigationContainer>
      {user ? <SideDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
