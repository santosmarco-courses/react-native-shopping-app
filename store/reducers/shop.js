import { PRODUCTS } from "../../db";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
  cart: [],
  loading: false,
};

const alreadyInCart = (state, productId) =>
  state.cart.findIndex((product) => product.id === productId) !== -1;

const setLoading = (state, { value }) => ({ ...state, loading: value });

const setProducts = (state, { products }) => ({
  ...state,
  products,
});

const addToCart = (state, { productId }) => {
  if (alreadyInCart(state, productId)) {
    return {
      ...state,
      cart: state.cart.map((product) =>
        product.id === productId
          ? { ...product, qty: product.qty + 1 }
          : product
      ),
    };
  } else {
    return {
      ...state,
      cart: [...state.cart, { id: productId, qty: 1 }],
    };
  }
};

const removeFromCart = (state, { productId }) => {
  if (alreadyInCart(state, productId)) {
    return {
      ...state,
      cart: state.cart.map((product) =>
        product.id === productId && product.qty > 0
          ? { ...product, qty: product.qty - 1 }
          : product
      ),
    };
  } else {
    return state;
  }
};

const modifyQtyInCart = (state, { productId, newQty }) => {
  if (newQty < 0) return state;

  if (alreadyInCart(state, productId)) {
    return {
      ...state,
      cart: state.cart.map((product) =>
        product.id === productId && product.qty > 0
          ? { ...product, qty: newQty }
          : product
      ),
    };
  } else {
    return {
      ...state,
      cart: [...state.cart, { id: productId, qty: newQty }],
    };
  }
};

const emptyCart = (state) => ({ ...state, cart: [] });

const addProduct = (state, { newProduct }) => ({
  ...state,
  products: [...state.products, newProduct],
});

const deleteProduct = (state, { productId }) => ({
  ...state,
  products: state.products.filter((p) => p.id !== productId),
  cart: state.cart.filter((p) => p.id !== productId),
});

const updateProduct = (state, { productId, newProduct }) => ({
  ...state,
  products: state.products.map((p) => (p.id === productId ? newProduct : p)),
});

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return setLoading(state, action);
    case actionTypes.SET_PRODUCTS:
      return setProducts(state, action);
    case actionTypes.ADD_TO_CART:
      return addToCart(state, action);
    case actionTypes.REMOVE_FROM_CART:
      return removeFromCart(state, action);
    case actionTypes.MODIFY_QTY_IN_CART:
      return modifyQtyInCart(state, action);
    case actionTypes.EMPTY_CART:
      return emptyCart(state);
    case actionTypes.DELETE_PRODUCT:
      return deleteProduct(state, action);
    case actionTypes.UPDATE_PRODUCT:
      return updateProduct(state, action);
    case actionTypes.ADD_PRODUCT:
      return addProduct(state, action);
    default:
      return state;
  }
};

export default shopReducer;
