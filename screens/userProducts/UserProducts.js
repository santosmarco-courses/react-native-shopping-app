import React, { useEffect, useCallback } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { ScreenContainer, ProductCard, EditProductBtn } from "../../components";
import { DEFAULT_SPACING } from "../../const/style";
import { fetchProducts } from "../../store/actions/shop";

const UserProducts = ({ navigation }) => {
  const userProducts = useSelector((state) => state.shop.products).filter(
    (p) => p.userId === "u1"
  );

  const dispatch = useDispatch();

  const loadProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useFocusEffect(loadProducts, [loadProducts]);

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

const styles = StyleSheet.create({});
