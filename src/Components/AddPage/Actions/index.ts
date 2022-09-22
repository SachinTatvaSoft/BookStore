import axios from "axios";

export const addBook = (data: any) => {
  return () => {
    return axios({
      method: "POST",
      url: "http://localhost:5000/books",
      data,
    }).then(({ data }) => data);
  };
};

export const updateBook = (data: any) => {
  return () => {
    return axios({
      method: "PUT",
      url: `http://localhost:5000/books/${data?.id}`,
      data,
    }).then(({ data }) => data);
  };
  
};

export const deleteBook = (id: string) => {
  return () => {
    return axios({
      method: "DELETE",
      url: `http://localhost:5000/books/${id}`,
    }).then(({ data }) => data);
  };
};
