import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";

const TouchableNative = ({
  onPress,
  containerStyle,
  touchableStyle,
  children,
}) => {
  const Touchable = Platform.select({
    ios: TouchableOpacity,
    android: TouchableNativeFeedback,
  });

  return (
    <View
      style={
        containerStyle ? [styles.container, containerStyle] : styles.container
      }
    >
      <Touchable
        style={[styles.touchable, touchableStyle]}
        onPress={onPress}
        useForeground
      >
        {children}
      </Touchable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  touchable: {
    flex: 1,
  },
});

export default TouchableNative;
