import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import "./App.css";
import AddPage from "./Components/AddPage/AddPage";
import { getCartItems } from "./Components/CartPage/Actions";
import CartPage from "./Components/CartPage/CartPage";
import Layout from "./Components/Layout/Layout";
import ListingPage from "./Components/ListingPage/ListingPage";
import Login from "./Components/Login/Login";
import ProductPage from "./Components/Product Page/ProductPage";
import Signup from "./Components/Signup/Signup";

type appProps = {
  getCartItems: () => void;
};

function App(props: appProps) {
  const [dataToBeUpdate, setDataToBeUpdate] = useState({});
  const [cartLength, setCartLength] = useState([]);

  const { pathname } = useLocation();

  const getAllCartItems = async () => {
    const response = await props?.getCartItems();
    if (
      response !== undefined &&
      response !== null &&
      typeof response === "object"
    ) {
      setCartLength(response);
    }
  };

  useEffect(() => {
    getAllCartItems();
  }, [pathname]);

  const history = useNavigate();

  const handleUpdateDataChange = (data: any) => {
    if (data?.id) {
      setDataToBeUpdate(data);
      history("/edit");
    }
  };

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Layout cartLength={cartLength} />}>
          <Route path="" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="add" element={<AddPage />} />
          <Route
            path="edit"
            element={<AddPage dataToBeUpdate={dataToBeUpdate} />}
          />
          <Route
            path="product-page"
            element={
              <ProductPage handleUpdateDataChange={handleUpdateDataChange} />
            }
          />
          <Route path="product-listing" element={<ListingPage />} />
        </Route>
      </Routes>
    </div>
  );
}

const mapDispatchToProps = {
  getCartItems,
};

export default connect(null, mapDispatchToProps)(App);
