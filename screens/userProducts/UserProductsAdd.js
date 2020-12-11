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
import { nanoid } from "nanoid/async/index.native";
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

const UserProductsAdd = ({ navigation, route }) => {
  const [product, setProduct] = useState({
    userId: "u1",
    title: "",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
    description: "",
    price: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [formattedPrice, setFormattedPrice] = useState("US$ 0.00");

  const dispatch = useDispatch();
  const { formatCurrency } = useGlobalize();

  const handleChangeOnPrice = (newValue) => {
    newValue = newValue.trim();
    if ((newValue.match(/,|\./g) || []).length > 1) {
      return showMessage({
        message: "Invalid price",
        description: `Product's price has already a decimal point: ${formattedPrice}`,
        type: "danger",
      });
    }
    if (
      (newValue.split(",")[1] && newValue.split(",")[1].length > 2) ||
      (newValue.split(".")[1] && newValue.split(".")[1].length > 2)
    ) {
      return showMessage({
        message: "Invalid price",
        description: `Sorry, your product's price must have only two decimal places: ${formattedPrice}`,
        type: "danger",
      });
    }

    const newPrice = newValue.replace(",", ".");

    let newFormattedPrice = "US$ ";
    if (newPrice.length === 0) {
      newFormattedPrice += "0.00";
    } else {
      newFormattedPrice += formatCurrency(parseFloat(newPrice)).replace(
        "$",
        ""
      );
    }

    setProduct((product) => ({
      ...product,
      price: newPrice,
    }));
    setFormattedPrice(newFormattedPrice);
  };

  const addItemHandler = useCallback(() => {
    dispatch(
      shopActions.addProduct({
        ...product,
        price:
          typeof product.price === "string"
            ? parseFloat(product.price)
            : product.price,
      })
    );
    showMessage({
      message: "Item added!",
      description: `${product.title} has been successfully added.`,
      type: "success",
    });
    navigation.navigate("My Products");
  }, [product, dispatch, navigation]);

  const validateProduct = useCallback(() => {
    if (product.title.length === 0) return false;
    if (product.imageUrl.length === 0) return false;
    if (product.description.length === 0) return false;
    if (product.price.length === 0 || parseFloat(product.price) === 0)
      return false;
    return true;
  }, [product]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          title="Confirm"
          iconName={Platform.select({
            ios: "ios-checkmark-circle",
            android: "md-checkmark-circle",
          })}
          onPress={addItemHandler}
          onPressIfDisabled={() =>
            showMessage({
              message: "Invalid product",
              description: `Please check all the fields.`,
              type: "warning",
            })
          }
          disabled={!isValid}
          iconColor="#4CB963"
        />
      ),
    });
  }, [navigation, addItemHandler, isValid]);

  useEffect(() => {
    if (validateProduct()) {
      return setIsValid(true);
    }
    return setIsValid(false);
  }, [product]);

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
              italic
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
                setProduct((product) => ({
                  ...product,
                  title: newValue,
                }))
              }
              styleOptions={{ container: styles.textInputContainer }}
            />
            <EditProductTextInput
              label="Image URL"
              value={product.imageUrl}
              onChangeText={(newValue) =>
                setProduct((product) => ({
                  ...product,
                  imageUrl: newValue,
                }))
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
                setProduct((product) => ({
                  ...product,
                  description: newValue,
                }))
              }
              styleOptions={{ container: styles.textInputContainer }}
            />
            <EditProductTextInput
              label="Price"
              value={product.price}
              valueWhenBlurred={formattedPrice}
              onChangeText={handleChangeOnPrice}
              onBlur={() =>
                setProduct((product) => ({
                  ...product,
                  price: parseFloat(product.price),
                }))
              }
              keyboardType="numeric"
            />
          </ScrollView>
          {isValid && (
            <TouchableNative
              touchableStyle={{ flex: 0 }}
              onPress={addItemHandler}
            >
              <View style={styles.addBtn}>
                <Title bold style={styles.addBtnLabel}>
                  Add{" "}
                  {product.title.length > 0 ? `"${product.title}"` : "Product"}
                </Title>
              </View>
            </TouchableNative>
          )}
        </View>
      </TouchableWithoutFeedback>
    </ScreenContainer>
  );
};

export default UserProductsAdd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  textInputContainer: {
    marginBottom: DEFAULT_SPACING * 0.7,
  },
  addBtn: {
    backgroundColor: "#4CB963",
    alignItems: "center",
    paddingVertical: DEFAULT_SPACING,
    borderRadius: DEFAULT_BORDER_RADIUS_SM,
  },
  addBtnLabel: {
    color: LIGHT,
    fontSize: DEFAULT_FONT_SIZE * 1.5,
  },
});
