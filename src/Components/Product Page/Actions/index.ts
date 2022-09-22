import axios from "axios";

export const getBooks = () => {
  return () => {
    return axios.get("http://localhost:5000/books").then(({ data }) => data);
  };
};

export const searchBooks = (term: string) => {
  return () => {
    return axios
      .get(`http://localhost:5000/books?q=${term}`)
      .then(({ data }) => data);
  };
};
