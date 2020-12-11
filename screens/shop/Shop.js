import React, { useEffect, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ProductCard, ScreenContainer, BodyText } from "../../components";
import { DEFAULT_SPACING } from "../../const/style";
import { fetchProducts } from "../../store/actions/shop";

const ShopScreen = ({ navigation }) => {
  const { products, loading } = useSelector((state) => state.shop);

  const dispatch = useDispatch();

  const loadProducts = useCallback(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const navigateToProductDetails = (productId, productTitle) => {
    navigation.navigate("Product Details", { productId, productTitle });
  };

  useEffect(() => {
    const focusUnsub = navigation.addListener("focus", () => {
      loadProducts();
    });

    return () => {
      focusUnsub();
    };
  }, [loadProducts]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator style={{ marginBottom: DEFAULT_SPACING }} />
        <BodyText>Loading products...</BodyText>
      </View>
    );
  } else if (products.length === 0) {
    return (
      <View style={styles.centered}>
        <BodyText>No products yet... start by adding one!</BodyText>
        <View style={{ marginTop: DEFAULT_SPACING }}>
          <Button
            title="Add Product"
            onPress={() => navigation.navigate("Add Product")}
          />
        </View>
      </View>
    );
  }

  return (
    <ScreenContainer>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            {...item}
            onCardPress={() => navigateToProductDetails(item.id, item.title)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        refreshing={loading}
        onRefresh={loadProducts}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemSeparator: {
    height: DEFAULT_SPACING * 0.7,
  },
});

export default ShopScreen;
