import React, { useState, useCallback } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { ScreenContainer, BodyText, OrderCard } from "../../components";
import { DEFAULT_SPACING } from "../../const/style";
import * as orderActions from "../../store/actions/orders";

const OrdersScreen = ({ navigation }) => {
  const orders = useSelector((state) => state.orders);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const getOrders = useCallback(() => {
    if (loading) {
      dispatch(orderActions.fetchOrders()).then(() => {
        setLoading(false);
      });
    }
  }, [loading]);

  useFocusEffect(() => {
    getOrders();
  }, [getOrders]);

  if (loading) {
    return (
      <View style={styles.noOrdersContainer}>
        <BodyText>Loading orders... Please wait.</BodyText>
      </View>
    );
  }

  return (
    <ScreenContainer>
      {orders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <BodyText>No orders yet {":("}</BodyText>
          <View style={styles.goShoppingBtnContainer}>
            <Button
              title="Go shopping"
              onPress={() => navigation.navigate("Shop")}
            />
          </View>
        </View>
      ) : (
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderCard data={item} />}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  noOrdersContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  goShoppingBtnContainer: {
    marginTop: DEFAULT_SPACING,
  },
  itemSeparator: {
    height: DEFAULT_SPACING * 0.7,
  },
});

export default OrdersScreen;
