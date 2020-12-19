import * as actionTypes from "./actionTypes";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

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
  console.log(orderItems);
  const notifications = {};

  // const createNotification = (item) => ({ title: "Shopping App", body: `Your product ${item.title} have just been ordered. (Qty: ${item.qty})`, attachments: [] });

  orderItems.forEach((item) => {
    const { ownerPushToken } = item;
    if (!ownerPushToken) {
      return;
    }
    if (!notifications[ownerPushToken]) {
      notifications[ownerPushToken] = [item];
    } else {
      notifications[ownerPushToken].push(item);
    }
  });

  // let permission = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  // if (permission.status !== "granted") {
  //   permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  // }
  // if (permission.status !== "granted") {
  // }

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

  console.log(notifications);

  for (let pushToken in notifications) {
    console.log(pushToken, {
      to: pushToken,
      title: "Shopping App",
      body: `A new order have just been placed to you. ${
        notifications[pushToken].length === 1
          ? `Product: ${notifications[pushToken][0].title}.`
          : `${notifications[pushToken].length} products included.`
      } Total: US$ ${notifications[pushToken].reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      )}.`,
      attachments: notifications[pushToken].length === 1 && [
        {
          identifier: notifications[pushToken][0].id,
          url: notifications[pushToken][0].imageUrl,
          type: "image",
        },
      ],
    });

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: pushToken,
        title: "Shopping App",
        body: `A new order have just been placed to you. ${
          notifications[pushToken].length === 1
            ? `Product: ${notifications[pushToken][0].title}.`
            : `${notifications[pushToken].length} products included.`
        } Total: US$ ${notifications[pushToken].reduce(
          (acc, item) => acc + item.price * item.qty,
          0
        )}.`,
        attachments: notifications[pushToken].length === 1 && [
          {
            identifier: notifications[pushToken][0].id,
            url: notifications[pushToken][0].imageUrl,
            type: "image",
          },
        ],
      }),
    });
    console.log("SENT");
  }

  dispatch(fetchOrders());
};
