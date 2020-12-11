import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { DEFAULT_SPACING } from "../const/style";

const ScreenContainer = ({ children, screenStyle, containerStyle }) => {
  return (
    <SafeAreaView
      style={screenStyle ? [styles.screen, screenStyle] : styles.screen}
    >
      <View
        style={
          containerStyle ? [styles.container, containerStyle] : styles.container
        }
      >
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: DEFAULT_SPACING,
  },
});

export default ScreenContainer;
