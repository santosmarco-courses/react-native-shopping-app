import * as actionTypes from "./actionTypes";

export const fetchOrders = () => async (dispatch, getState) => {
  const res = await fetch(
    `https://rn-shopping-app-4356f-default-rtdb.firebaseio.com/orders/${
      getState().auth.user.id
    }.json`
  );
  const data = await res.json();

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

export const addOrder = (orderItems) => async (dispatch, getState) => {
  await fetch(
    `https://rn-shopping-app-4356f-default-rtdb.firebaseio.com/orders/${
      getState().auth.user.id
    }.json?auth=${getState().auth.idToken}`,
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
