import React from "react";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchHeader from "../SearchHeader/SearchHeader";

function Layout(props:{cartLength:any[]}) {
  const {cartLength} = props
  return (
    <div className="layout-container">
      <div className="header">
        <Header cartLength={cartLength} />
      </div>
      <div className="content-view-container">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
