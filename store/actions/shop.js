import * as actionTypes from "./actionTypes";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { lessThan } from "react-native-reanimated";

export const startLoading = () => ({
  type: actionTypes.SET_LOADING,
  value: true,
});

export const endLoading = () => ({
  type: actionTypes.SET_LOADING,
  value: false,
});

export const fetchProducts = () => async (dispatch) => {
  dispatch(startLoading());

  const res = await fetch(
    "https://rn-shopping-app-4356f-default-rtdb.firebaseio.com/products.json"
  );
  const data = await res.json();

  let allProducts = [];

  if (data) {
    allProducts = Object.entries(data).map(([key, val]) => ({
      id: key,
      ...val,
    }));
  }

  dispatch({
    type: actionTypes.SET_PRODUCTS,
    products: allProducts,
  });

  dispatch(endLoading());
};

export const addToCart = (productId) => ({
  type: actionTypes.ADD_TO_CART,
  productId,
});

export const removeFromCart = (productId) => ({
  type: actionTypes.REMOVE_FROM_CART,
  productId,
});

export const modifyQtyInCart = (productId, newQty) => ({
  type: actionTypes.MODIFY_QTY_IN_CART,
  productId,
  newQty,
});

export const emptyCart = () => ({
  type: actionTypes.EMPTY_CART,
});

export const addProduct = (newProduct) => async (dispatch, getState) => {
  let pushToken;
  const permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (permission.status !== "granted") {
    const updatedPermission = await Permissions.askAsync(
      Permissions.NOTIFICATIONS
    );
    if (updatedPermission.status !== "granted") {
      pushToken = null;
    } else {
      pushToken = await Notifications.getExpoPushTokenAsync();
    }
  } else {
    pushToken = await Notifications.getExpoPushTokenAsync();
  }

  await fetch(
    `https://rn-shopping-app-4356f-default-rtdb.firebaseio.com/products.json?auth=${
      getState().auth.idToken
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newProduct,
        ownerPushToken: pushToken?.data
      }),
    }
  );

  dispatch(fetchProducts());
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  await fetch(
    `https://rn-shopping-app-4356f-default-rtdb.firebaseio.com/products/${productId}.json?auth=${
      getState().auth.idToken
    }`,
    { method: "DELETE" }
  );

  dispatch(fetchProducts());
};

export const updateProduct = (productId, newProduct) => async (
  dispatch,
  getState
) => {
  await fetch(
    `https://rn-shopping-app-4356f-default-rtdb.firebaseio.com/products/${productId}.json?auth=${
      getState().auth.idToken
    }`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    }
  );

  dispatch(fetchProducts());
};
