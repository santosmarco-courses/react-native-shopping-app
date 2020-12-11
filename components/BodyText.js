import React from "react";
import { StyleSheet, Text } from "react-native";

const BodyText = ({ children, style, bold, italic }) => {
  let defaultStyle = styles.text;
  if (bold && italic) {
    defaultStyle = styles.textBoldItalic;
  } else if (bold) {
    defaultStyle = styles.textBold;
  } else if (italic) {
    defaultStyle = styles.textItalic;
  }

  return (
    <Text style={style ? [defaultStyle, style] : defaultStyle}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "roboto",
  },
  textBold: {
    fontFamily: "roboto-bold",
  },
  textItalic: {
    fontFamily: "roboto-italic",
  },
  textBoldItalic: {
    fontFamily: "roboto-bold-italic",
  },
});

export default BodyText;
