import axios from "axios";

export const addToCart = (data: any) => {
  return () => {
    return axios({
      method: "POST",
      url: "http://localhost:5000/cart-items",
      data,
    }).then(({ data }) => data);
  };
};
