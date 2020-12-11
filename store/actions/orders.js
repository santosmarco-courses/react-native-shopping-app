import * as actionTypes from "./actionTypes";

export const fetchOrders = () => async (dispatch) => {
  const res = await fetch(
    "https://rn-shopping-app-4356f-default-rtdb.firebaseio.com/orders.json"
  );
  const data = res.json();

  let allOrders = [];

  if (data) {
    allOrders = Object.entries(data).map(([key, val]) => ({
      id: key,
      ...val,
    }));
  }

  dispatch({
    type: actionTypes.SET_ORDERS,
    orders: allOrders,
  });
};

export const addOrder = (orderItems) => async (dispatch) => {
  await fetch(
    "https://rn-shopping-app-4356f-default-rtdb.firebaseio.com/orders.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createOrder(orderItems)),
    }
  );

  dispatch(fetchOrders());
};
