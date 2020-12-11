import React from "react";
import { StyleSheet, Text } from "react-native";

const Title = ({ children, style, bold }) => {
  const defaultStyle = bold ? styles.titleBold : styles.title;

  return (
    <Text style={style ? [defaultStyle, style] : defaultStyle}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "poppins",
  },
  titleBold: {
    fontFamily: "poppins-bold",
  },
});

export default Title;
