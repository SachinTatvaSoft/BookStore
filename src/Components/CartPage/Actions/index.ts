import axios from "axios";

export const getCartItems = () => {
  return () => {
    return axios
      .get("http://localhost:5000/cart-items")
      .then(({ data }) => data);
  };
};

export const deleteItemFromCart = (id: string) => {
  return () => {
    return axios
      .delete(`http://localhost:5000/cart-items/${id}`)
      .then(({ data }) => data);
  };
};

export const quantityChange = (data: any) => {
  return () => {
    return axios
      .put(`http://localhost:5000/cart-items/${data?.id}`,data)
      .then(({ data }) => data);
  };
};

export const clearCart = () => {
  return () => {
    return axios
      .delete(`http://localhost:5000/cart-items`)
      .then(({ data }) => data);
  };
};

export const searchCartItems = (term:string) => {
  return () => {
    return axios
      .get(`http://localhost:5000/cart-items?q=${term}`)
      .then(({ data }) => data);
  };
};