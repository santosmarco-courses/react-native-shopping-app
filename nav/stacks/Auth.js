import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthScreen } from "../../screens";

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login">
      {(props) => <AuthScreen {...props} />}
    </Stack.Screen>
    <Stack.Screen name="Sign Up">
      {(props) => <AuthScreen {...props} signUp />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthStack;
