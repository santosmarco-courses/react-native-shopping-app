import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useDispatch } from "react-redux";
import { ScreenContainer } from "../../components";
import * as authActions from "../../store/actions/auth";

const UserScreen = () => {
  const dispatch = useDispatch();

  return (
    <ScreenContainer>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Button
          title="Logout"
          onPress={() => dispatch(authActions.signOut())}
        />
      </View>
    </ScreenContainer>
  );
};

export default UserScreen;

const styles = StyleSheet.create({});
