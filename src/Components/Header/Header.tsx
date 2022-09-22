import { Button } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import tatvasoft from "../../Assets/tatvasoft.png";

function Header(props:{cartLength:any[]}) {
  const {cartLength} = props

  console.log(cartLength)
  const history = useNavigate();
  const handleCart = () => {
    history("/cart");
  };
  return (
    <div className="header-container">
      <div>
        <img
          src={String(tatvasoft)}
          alt="logo"
          height={"50px"}
          width={"140px"}
        />
      </div>

      <div className="login-cart-container">
        <div className="login-signup-header-links">
          <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </div>
        <div>
          <Button className="header-cart-button" onClick={handleCart}>
            <i className="fas fa-shopping-cart" />
            &nbsp;<span> {cartLength?.length} </span>&nbsp; Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Header;
