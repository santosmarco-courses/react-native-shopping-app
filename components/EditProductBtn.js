import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import TouchableNative from "./TouchableNative";
import BodyText from "./BodyText";
import * as colors from "../const/colors";
import * as styleConst from "../const/style";

export default function EditProductBtn({ onPress }) {
  return (
    <TouchableNative containerStyle={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Feather
          name="edit-3"
          color={colors.LIGHT}
          size={styleConst.DEFAULT_FONT_SIZE * 1.4}
        />
        <BodyText style={styles.label}>Edit</BodyText>
      </View>
    </TouchableNative>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BTNS_PRIMARY,
    borderRadius: styleConst.DEFAULT_BORDER_RADIUS_SM,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: styleConst.DEFAULT_SPACING,
  },
  label: {
    color: colors.LIGHT,
    marginLeft: styleConst.DEFAULT_SPACING * 0.3,
    fontSize: styleConst.DEFAULT_FONT_SIZE * 1.2,
  },
});
