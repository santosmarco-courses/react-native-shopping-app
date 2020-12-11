import * as actionTypes from "./actionTypes";

export const addOrder = (orderId, orderItems) => {
  return {
    type: actionTypes.ADD_ORDER,
    orderId,
    orderItems,
  };
};
