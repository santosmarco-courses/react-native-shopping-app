export const formatPrice = (price) => {
  const decPlaces = 2;
  const decSep = ".";
  const thouSep = ",";

  const sign = price < 0 ? "-" : "";
  const i = String(
    parseInt((price = Math.abs(Number(price) || 0).toFixed(decPlaces)))
  );
  let j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    sign +
    (j ? i.substr(0, j) + thouSep : "") +
    i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
    (decPlaces
      ? decSep +
        Math.abs(price - i)
          .toFixed(decPlaces)
          .slice(2)
      : "")
  );
};

// export const formatPrice = (price) =>
//   new Intl.NumberFormat("en-US").format(price);

export const getDollars = (price) => formatPrice(price).split(".")[0];

export const getCents = (price) => formatPrice(price).split(".")[1];
