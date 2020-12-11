import moment from "moment";

export default createOrder = (items) => {
  const now = moment();

  return {
    items,
    placedAt: now,
    totalAmount: items.reduce((acc, item) => acc + item.qty * item.price, 0),
  };
};
