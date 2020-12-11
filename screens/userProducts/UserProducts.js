import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, ActivityIndicator, View, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  ScreenContainer,
  ProductCard,
  EditProductBtn,
  BodyText,
} from "../../components";
import { DEFAULT_SPACING } from "../../const/style";
import { fetchProducts } from "../../store/actions/shop";

const UserProducts = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const userProducts = useSelector((state) => state.shop.products).filter(
    (p) => p.userId === "u1"
  );

  const dispatch = useDispatch();

  const loadProducts = useCallback(() => {
    setLoading(true);
    dispatch(fetchProducts()).then(() => setLoading(false));
  }, [dispatch]);

  useFocusEffect(loadProducts, [loadProducts]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator style={{ marginBottom: DEFAULT_SPACING }} />
        <BodyText>Loading products...</BodyText>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <FlatList
        data={userProducts}
        renderItem={({ item }) => (
          <ProductCard
            {...item}
            disableClickOnCard
            CustomButtonComponent={() => (
              <EditProductBtn
                onPress={() =>
                  navigation.navigate("Edit Product", { product: item })
                }
              />
            )}
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: DEFAULT_SPACING * 0.7 }} />
        )}
      />
    </ScreenContainer>
  );
};

export default UserProducts;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
