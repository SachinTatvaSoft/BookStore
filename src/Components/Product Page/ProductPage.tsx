import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBooks, searchBooks } from "./Actions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { deleteBook } from "../AddPage/Actions";
import SearchHeader from "../SearchHeader/SearchHeader";

type productPageTypes = {
  handleUpdateDataChange: (data: any) => void;
  getBooks: () => void;
  searchBooks: (term: string) => void;
  deleteBook: (id: string) => void;
};

function ProductPage(props: productPageTypes) {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const rows: any[] = [];
  const getAllBooks = async () => {
    const response = await props?.getBooks();
    if (response !== undefined && response !== null) {
      setData(response);
    }
  };

  const createData = (
    id: string,
    firstName: string,
    lastName: string,
    shopByCategory: string,
    description: string,
    bookImage?: string
  ) => {
    rows?.push({ id, firstName, lastName, shopByCategory, description, bookImage });
  };

  data?.map((row) => {
    createData(
      row["id"],
      row["firstName"],
      row["lastName"],
      row["shopByCategory"],
      row["description"],
      row?.["bookImage"]
    );
  });

  const handleDelete = async (id: string) => {
    const response = await props?.deleteBook(id);
    if (response !== undefined && response !== null) {
      getAllBooks();
    }
  };

  const searchItems = async () => {
    const response = await props?.searchBooks(searchTerm);
    if (response !== undefined && response !== null) {
      setData(response);
    }
  };

  useEffect(() => {
    if (searchTerm?.trim() === "") {
      getAllBooks();
    }
  }, [searchTerm]);

  return (
    <>
      <div className="search-header">
        <SearchHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSubmit={searchItems}
        />
      </div>
      <div className="product-page-table-container">
        <p className="home-login-text login-page-create-text">Product Page</p>
        {data.length > 0 ? (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">
                    {row?.firstName} {row?.lastName}
                  </TableCell>
                  <TableCell align="left">{row?.description}</TableCell>
                  <TableCell align="left">{row?.shopByCategory}</TableCell>
                  <TableCell align="right">
                    <Button
                      className="edit-button"
                      onClick={() => props?.handleUpdateDataChange(row)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="delete-button"
                      onClick={() => handleDelete(row?.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>
            <h1>No Books Available</h1>
          </div>
        )}
      </div>
    </>
  );
}

const mapDispatchToProps = {
  getBooks,
  deleteBook,
  searchBooks,
};

export default connect(null, mapDispatchToProps)(ProductPage);
