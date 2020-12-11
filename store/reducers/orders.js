import * as actionTypes from "../actions/actionTypes";
import createOrder from "../../utils/createOrder";

const initialState = [];

const setOrders = (state, { orders }) => {
  return orders;
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS:
      return setOrders(state, action);
    default:
      return state;
  }
};

export default ordersReducer;
