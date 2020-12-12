import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import moment from "moment";
import { useGlobalize } from "react-native-globalize";
import TouchableNative from "./TouchableNative";
import Title from "./Title";
import BodyText from "./BodyText";
import OrderCardItem from "./OrderCardItem";
import SectionTitle from "./SectionTitle";
import * as styleConst from "../const/style";
const OrderCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);
  const { formatCurrency } = useGlobalize();

  return (
    <TouchableNative
      containerStyle={styles.cardContainer}
      onPress={() => setExpanded((currState) => !currState)}
    >
      <View style={styles.card}>
        <SectionTitle
          containerStyle={styles.titleContainer}
          RightComponent={() => (
            <BodyText italic style={styles.orderIdText}>
              #{data.id}
            </BodyText>
          )}
        >
          Your Order{" "}
        </SectionTitle>
        <View style={styles.orderInfo}>
          <OrderCardItem
            iconName="clock"
            iconColor="#016FB9"
            containerStyle={{ flex: 1.3 }}
          >
            {moment(data.placedAt).format("MM/DD/YY")}
          </OrderCardItem>
          <OrderCardItem iconName="pricetags" iconColor="#E83151">
            {data.items.reduce((acc, item) => acc + item.qty, 0)}
          </OrderCardItem>
          <OrderCardItem
            iconName="cash"
            iconColor="#4CB963"
            containerStyle={{ justifyContent: "flex-end" }}
          >
            <BodyText style={styles.dollarSign}>$ </BodyText>
            {formatCurrency(data.totalAmount).replace("$", "")}
          </OrderCardItem>
        </View>
      </View>
      {expanded && (
        <View style={styles.expansionContainer}>
          <SectionTitle borderless containerStyle={styles.productsTitle}>
            Products
          </SectionTitle>
          <FlatList
            data={data.items.sort((a, b) => b.qty - a.qty)}
            renderItem={({ item }) => (
              <View style={styles.productContainer}>
                <BodyText>
                  {item.qty}x <BodyText italic>{item.title}</BodyText>
                </BodyText>
                <BodyText>
                  <BodyText style={styles.dollarSign}>$ </BodyText>
                  <BodyText>
                    {formatCurrency(item.price * item.qty).replace("$", "")}
                  </BodyText>
                </BodyText>
              </View>
            )}
            ItemSeparatorComponent={() => (
              <View style={{ height: styleConst.DEFAULT_SPACING * 0.2 }} />
            )}
          />
        </View>
      )}
    </TouchableNative>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    borderRadius: styleConst.DEFAULT_BORDER_RADIUS_SM,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: {
    paddingHorizontal: styleConst.DEFAULT_SPACING,
  },
  titleContainer: {
    alignItems: "baseline",
    borderBottomColor: "#ccc",
    marginTop: styleConst.DEFAULT_SPACING * 0.6,
    marginBottom: 0,
  },
  orderIdText: {
    fontSize: styleConst.DEFAULT_FONT_SIZE * 0.9,
  },
  orderInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: styleConst.DEFAULT_SPACING * 0.8,
  },
  dollarSign: {
    fontSize: styleConst.DEFAULT_FONT_SIZE * 0.7,
  },
  expansionContainer: {
    borderTopWidth: 1,
    borderColor: "#ccc",
    padding: styleConst.DEFAULT_SPACING,
  },
  productsTitle: {
    marginBottom: styleConst.DEFAULT_SPACING * 0.3,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default OrderCard;
