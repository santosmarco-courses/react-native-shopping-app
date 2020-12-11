import * as actionTypes from "../actions/actionTypes";
import createOrder from "../../utils/createOrder";

const initialState = [];

const addOrder = (state, { orderId, orderItems }) => {
  const order = createOrder(orderId, orderItems);
  return [...state, order];
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ORDER:
      return addOrder(state, action);
    default:
      return state;
  }
};

export default ordersReducer;
