import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DARK } from "../const/colors";
import { DEFAULT_FONT_SIZE, DEFAULT_SPACING } from "../const/style";
import Title from "./Title";

const SectionTitle = ({
  children,
  containerStyle,
  textStyle,
  borderless,
  icon,
  RightComponent,
}) => {
  return (
    <View
      style={[
        styles.container,
        borderless && styles.borderless,
        containerStyle,
      ]}
    >
      {icon && (
        <View style={styles.iconContainer}>
          <Ionicons
            name={Platform.select({
              ios: icon.iosName,
              android: icon.androidName,
            })}
            size={icon.size || DEFAULT_FONT_SIZE * 1.5}
            color={icon.color || "black"}
          />
        </View>
      )}
      <Title bold style={textStyle ? [styles.text, textStyle] : styles.text}>
        {children}
      </Title>
      {RightComponent && <RightComponent />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: DARK,
    marginBottom: DEFAULT_SPACING * 0.6,
    flexDirection: "row",
    alignItems: "center",
  },
  borderless: {
    borderBottomWidth: 0,
  },
  text: {
    fontSize: DEFAULT_FONT_SIZE * 1.3,
  },
  iconContainer: {
    marginRight: DEFAULT_SPACING * 0.4,
  },
});

export default SectionTitle;
