import moment from "moment";

export default createOrder = (id, items) => {
  const now = moment();

  return {
    id: id.toUpperCase().slice(0, 10),
    items,
    placedAt: now,
    totalAmount: items.reduce((acc, item) => acc + item.qty * item.price, 0),
  };
};
