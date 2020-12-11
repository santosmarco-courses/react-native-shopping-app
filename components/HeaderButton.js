import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { StyleSheet, Text, View } from "react-native";
import { DARK } from "../const/colors";
import TouchableNative from "./TouchableNative";

const CustomHeaderButton = ({
  title,
  iconName,
  iconColor,
  onPress,
  RenderLeft,
  disabled,
  onPressIfDisabled,
}) => {
  return (
    <HeaderButtons
      HeaderButtonComponent={(hbcProps) => (
        <HeaderButton
          IconComponent={Ionicons}
          iconSize={23}
          color={disabled ? "#ccc" : iconColor ? iconColor : DARK}
          {...hbcProps}
        />
      )}
    >
      <View style={styles.contentContainer}>
        {RenderLeft && (
          <TouchableNative onPress={onPress}>
            <RenderLeft />
          </TouchableNative>
        )}
        <Item
          title={title}
          iconName={iconName}
          onPress={disabled ? onPressIfDisabled : onPress}
          buttonStyle={RenderLeft && styles.itemBtn}
        />
      </View>
    </HeaderButtons>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemBtn: {
    marginLeft: 0,
  },
});

export default CustomHeaderButton;
