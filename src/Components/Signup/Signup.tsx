import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";

function Signup() {
  const [signUpDetails, setSignUpDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const history = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };

  const handleSignUp = () => {
    const { firstName, lastName, email, password, confirmPassword } =
      signUpDetails;
    if (
      firstName?.trim() !== "" &&
      lastName?.trim() !== "" &&
      email?.trim() !== "" &&
      password?.trim() !== "" &&
      confirmPassword?.trim() !== ""
    ) {
      history("/add");
    } else {
      window?.alert("Enter The Required Fields");
    }
  };
  return (
    <div>
      <div className="home-login-text">
        <p>
          {`Home > `}
          <span style={{ color: "#f14d54" }}>Create an account</span>
        </p>
      </div>
      <p className="home-login-text login-page-create-text">
        Login or Create an Account
      </p>
      <div className="login-main-container" style={{ flexDirection: "column" }}>
        <div
          className="login-form-registraion-container"
          style={{ width: "75%", marginBottom: "70px" }}
        >
          <div className="login-page-div">
            <p className="login-heading-text">Personal Information</p>
            <hr />
            <p>
              Please enter the following information to create your account.
            </p>
            <div className="login-form-container">
              <div className="form-name-container">
                <div>
                  <span className="form-label" style={{ marginBottom: "25px" }}>
                    First Name *
                  </span>
                  <TextField
                    name="firstName"
                    value={signUpDetails?.firstName}
                    className="search-input"
                    style={{ marginBottom: "25px" }}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <span className="form-label" style={{ marginBottom: "25px" }}>
                    Last Name *
                  </span>
                  <TextField
                    className="search-input"
                    name="lastName"
                    value={signUpDetails?.lastName}
                    style={{ marginBottom: "25px" }}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <span className="form-label">Email *</span>
              <TextField
                className="search-input"
                name="email"
                value={signUpDetails?.email}
                style={{ marginBottom: "25px", width: "97%" }}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div
          className="login-form-registraion-container"
          style={{ width: "75%", marginTop: "5px" }}
        >
          <div className="login-page-div">
            <p className="login-heading-text">Login Information</p>
            <hr />
            <div className="login-form-container">
              <div className="form-name-container">
                <div>
                  <span className="form-label" style={{ marginBottom: "25px" }}>
                    Password *
                  </span>
                  <TextField
                    className="search-input"
                    name="password"
                    value={signUpDetails?.password}
                    style={{ marginBottom: "25px" }}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <span className="form-label" style={{ marginBottom: "25px" }}>
                    Confirm Password*
                  </span>
                  <TextField
                    className="search-input"
                    name="confirmPassword"
                    value={signUpDetails?.confirmPassword}
                    style={{ marginBottom: "25px" }}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: "11rem" }}>
        <Button
          className="register-signup-button"
          style={{ marginTop: "60px", alignItems: "left" }}
          onClick={handleSignUp}
        >
          Register
        </Button>
      </div>
    </div>
  );
}

export default Signup;
