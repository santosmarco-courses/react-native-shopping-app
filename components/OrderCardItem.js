import React from "react";
import { StyleSheet, Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Title from "./Title";
import { DEFAULT_SPACING, DEFAULT_FONT_SIZE } from "../const/style";

const OrderCardItem = ({
  children,
  iconName,
  iconColor,
  containerStyle,
  iconStyle,
  textStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.icon, iconStyle]}>
        <Ionicons
          name={Platform.select({ ios: "ios-", android: "md-" }) + iconName}
          size={DEFAULT_FONT_SIZE * 1.5}
          color={iconColor || ""}
        />
      </View>
      <Title style={textStyle}>{children}</Title>
    </View>
  );
};

export default OrderCardItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: DEFAULT_SPACING * 0.4,
  },
});
