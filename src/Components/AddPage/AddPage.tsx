import {
  Button,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addBook, updateBook } from "./Actions";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router";

type addBookType = {
  dataToBeUpdate?: any;
  addBook: (data: any) => void;
  updateBook: (data: any) => void;
};

function AddPage(props: addBookType) {
  const { dataToBeUpdate } = props || {};
  const [bookData, setBookData] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    shopByCategory: string;
    description: string;
    bookImage: any;
  }>({
    id: "",
    firstName: "",
    lastName: "",
    shopByCategory: "",
    description: "",
    bookImage: "",
  });

  const { firstName, lastName, shopByCategory, description } = bookData;

  const names = ["Paid", "Free", "Test", "Shared"];

  const history = useNavigate();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<typeof shopByCategory>
  ) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (bookData?.id) {
      const response = await props?.updateBook({ ...bookData });
      if (response !== undefined && response !== null) {
        history("/product-page");
        setBookData({
          id: "",
          firstName: "",
          lastName: "",
          shopByCategory: "",
          description: "",
          bookImage: "",
        });
      }
    } else {
      const response = await props?.addBook({
        ...bookData,
        id: uuidv4(),
        originalPrice: 100,
        price: 500,
        discount: "50%",
      });
      if (response !== undefined && response !== null) {
        history("/product-page");
        setBookData({
          id: "",
          firstName: "",
          lastName: "",
          shopByCategory: "",
          description: "",
          bookImage: "",
        });
      }
    }
  };

  const handleFileRead = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      let file;
      file = e.target.files[0];
      const base64 = await convertBase64(file);
      const data = { ...bookData };
      data.bookImage = base64;
      setBookData(data);
    }
  };

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  useEffect(() => {
    if (dataToBeUpdate?.id) {
      setBookData(dataToBeUpdate);
    }
  }, []);

  return (
    <div>
      <p className="home-login-text login-page-create-text">
        {bookData?.id ? "Edit Product" : "Add Product"}
      </p>
      <div
        className="login-main-container"
        style={{ flexDirection: "column", marginTop: "50px" }}
      >
        <div
          className="login-form-registraion-container"
          style={{ width: "75%" }}
        >
          <div className="login-page-div">
            <div className="login-form-container">
              <div
                className="form-name-container"
                style={{ marginBottom: "15px" }}
              >
                <div>
                  <span className="form-label">First Name *</span>
                  <TextField
                    name="firstName"
                    className="search-input"
                    style={{ marginBottom: "25px", marginTop: "15px" }}
                    value={firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <span className="form-label">Last Name *</span>
                  <TextField
                    className="search-input"
                    name="lastName"
                    style={{ marginBottom: "25px", marginTop: "15px" }}
                    value={lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="login-form-container">
              <div
                className="form-name-container"
                style={{ width: "96%", marginBottom: "60px" }}
              >
                <div>
                  <span className="form-label">Shop By Categories *</span>
                  <FormControl sx={{ width: 423, mt: "15px", p: "0px" }}>
                    <Select
                      className="catergory-dropdown"
                      displayEmpty
                      name="shopByCategory"
                      value={shopByCategory}
                      onChange={handleChange}
                    >
                      <MenuItem disabled value="">
                        <span>Select Category</span>
                      </MenuItem>
                      {names.map((name) => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <span className="form-label">Description *</span>
                  <TextField
                    className="search-input"
                    name="description"
                    style={{ marginBottom: "25px", marginTop: "15px" }}
                    value={description}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="login-form-container">
              <div
                className="form-name-container"
                style={{
                  flexDirection: "column",
                  width: "46.2%",
                  marginBottom: "35px",
                }}
              >
                <Button className="uplaod-button-container" component="label">
                  <Button
                    variant="contained"
                    className="upload-button"
                    component="label"
                  >
                    Upload File
                    <input
                      className="file-upload"
                      type="file"
                      hidden
                      onChange={handleFileRead}
                    />
                  </Button>
                  <input
                    className="file-upload"
                    type="file"
                    onChange={handleFileRead}
                  />
                </Button>
              </div>
            </div>
            <div style={{ marginBottom: "80px" }}>
              <Button className="add-book-save-button" onClick={handleSave}>
                {bookData?.id ? "Edit" : "Save"}
              </Button>
              <Button className="add-book-cancel-button" onClick={()=>history("/product-page")}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  addBook,
  updateBook,
};

export default connect(null, mapDispatchToProps)(AddPage);
