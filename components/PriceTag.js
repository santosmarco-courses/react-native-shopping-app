import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { DEFAULT_FONT_SIZE, DEFAULT_SPACING } from "../const/style";
import { useGlobalize } from "react-native-globalize";
import BodyText from "./BodyText";

const PriceTag = ({ price, fontSizeMult, containerStyle }) => {
  const { formatCurrency } = useGlobalize();

  if (!fontSizeMult) {
    fontSizeMult = 1;
  }
  const generalFontSize = DEFAULT_FONT_SIZE * 1.6 * fontSizeMult;

  return (
    <View style={[styles.container, containerStyle]}>
      <BodyText
        style={{
          fontSize: generalFontSize * 0.6,
          marginRight: DEFAULT_SPACING * 0.2 * fontSizeMult,
          paddingBottom: Platform.select({
            ios: 1.7 * fontSizeMult,
            android: 2.1 * fontSizeMult,
          }),
        }}
      >
        US$
      </BodyText>
      <BodyText style={{ fontSize: generalFontSize }}>
        {formatCurrency(price).replace("$", "").split(".")[0]}
      </BodyText>
      <BodyText
        style={{ ...styles.priceCents, fontSize: generalFontSize * 0.4 }}
      >
        {formatCurrency(price).replace("$", "").split(".")[1]}
      </BodyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  priceCents: {
    alignSelf: "flex-start",
  },
});

export default PriceTag;
