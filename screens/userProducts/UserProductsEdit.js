import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  Alert,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import { useGlobalize } from "react-native-globalize";
import {
  ScreenContainer,
  TouchableNative,
  Title,
  EditProductTextInput,
  HeaderButton,
} from "../../components";
import {
  DEFAULT_SPACING,
  DEFAULT_BORDER_RADIUS_SM,
  DEFAULT_FONT_SIZE,
} from "../../const/style";
import { LIGHT } from "../../const/colors";
import * as shopActions from "../../store/actions/shop";

const UserProductsEdit = ({ navigation, route }) => {
  const originalProduct = useSelector((state) => state.shop.products).filter(
    (p) => p.id === route.params.product.id
  )[0];
  const [product, setProduct] = useState({ ...route.params.product });
  const [didEdit, setDidEdit] = useState(false);

  const dispatch = useDispatch();
  const { formatCurrency } = useGlobalize();

  const updateItemHandler = useCallback(() => {
    dispatch(shopActions.updateProduct(product.id, product));
    showMessage({
      message: "Item updated!",
      description: `${product.title} has been successfully updated.`,
      type: "success",
    });
    navigation.navigate("My Products");
  }, [product, dispatch, navigation]);

  const deleteItemHandler = useCallback(() => {
    const deleteItem = () => {
      navigation.navigate("My Products");
      showMessage({
        message: "Item deleted",
        description: `${product.title} was successfully deleted.`,
        type: "danger",
      });
      dispatch(shopActions.deleteProduct(product.id));
    };

    Alert.alert(
      "Are you sure?",
      `This action will delete ${product.title} permanently. Do you wish to continue?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", onPress: deleteItem },
      ]
    );
  }, [product, dispatch, navigation]);

  useEffect(() => {
    if (!(product && originalProduct)) return;
    for (let key in product) {
      if (product[key] !== originalProduct[key]) {
        return setDidEdit(true);
      }
    }
    return setDidEdit(false);
  }, [product, originalProduct]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          title="Save"
          iconName={Platform.select({ ios: "ios-save", android: "md-save" })}
          onPress={updateItemHandler}
          onPressIfDisabled={() =>
            showMessage({
              message: "Could not update",
              description: `Product did not change.`,
              type: "warning",
            })
          }
          disabled={!didEdit}
        />
      ),
    });
  }, [navigation, updateItemHandler, didEdit]);

  return (
    <ScreenContainer>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <ScrollView style={{ marginBottom: DEFAULT_SPACING }}>
            <EditProductTextInput
              label="Product ID"
              value={product.id}
              styleOptions={{ container: styles.textInputContainer }}
              disabled
            />
            <EditProductTextInput
              label="Owner ID"
              value={product.userId}
              styleOptions={{ container: styles.textInputContainer }}
              disabled
            />
            <EditProductTextInput
              label="Title"
              value={product.title}
              onChangeText={(newValue) =>
                setProduct((product) => ({ ...product, title: newValue }))
              }
              styleOptions={{ container: styles.textInputContainer }}
            />
            <EditProductTextInput
              label="Image URL"
              value={product.imageUrl}
              onChangeText={(newValue) =>
                setProduct((product) => ({ ...product, imageUrl: newValue }))
              }
              keyboardType="url"
              selectTextOnFocus
              styleOptions={{
                container: [styles.textInputContainer],
              }}
              RightSideComponent={() => (
                <Image
                  source={{ uri: product.imageUrl }}
                  style={{
                    width: 61,
                    height: 61,
                    borderRadius: 61 / 2,
                    borderWidth: 1,
                    borderColor: "#ccc",
                    marginLeft: DEFAULT_SPACING * 0.6,
                  }}
                />
              )}
            />
            <EditProductTextInput
              label="Description"
              value={product.description}
              onChangeText={(newValue) =>
                setProduct((product) => ({ ...product, description: newValue }))
              }
              styleOptions={{ container: styles.textInputContainer }}
            />
            <EditProductTextInput
              label="Price"
              value={"US$ " + formatCurrency(product.price).replace("$", "")}
              disabled
            />
          </ScrollView>
          <TouchableNative
            touchableStyle={{ flex: 0 }}
            onPress={deleteItemHandler}
          >
            <View style={styles.deleteBtn}>
              <Title bold style={styles.deleteBtnLabel}>
                Delete "{product.title}"
              </Title>
            </View>
          </TouchableNative>
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default UserProductsEdit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  textInputContainer: {
    marginBottom: DEFAULT_SPACING * 0.7,
  },
  deleteBtn: {
    backgroundColor: "#E83151",
    alignItems: "center",
    paddingVertical: DEFAULT_SPACING,
    borderRadius: DEFAULT_BORDER_RADIUS_SM,
  },
  deleteBtnLabel: {
    color: LIGHT,
    fontSize: DEFAULT_FONT_SIZE * 1.5,
  },
});
