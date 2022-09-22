import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import SearchHeader from "../SearchHeader/SearchHeader";
import {
  deleteItemFromCart,
  getCartItems,
  quantityChange,
  clearCart,
  searchCartItems,
} from "./Actions";

type cartPageProps = {
  getCartItems: () => void;
  clearCart: () => void;
  quantityChange: (data: any) => void;
  deleteItemFromCart: (id: string) => void;
  searchCartItems: (term: string) => void;
};

function CartPage(props: cartPageProps) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const history = useNavigate();

  const getAllCartItems = async () => {
    const response = await props?.getCartItems();
    if (
      response !== undefined &&
      response !== null &&
      typeof response === "object"
    ) {
      setCartItems(response);
    }
  };

  const priceArray = cartItems?.map((item) => item?.price);
  const total = 0;
  const totalBagPrice = priceArray.reduce(
    (previousValue, currentValue) =>
      parseInt(previousValue) + parseInt(currentValue),
    total
  );

  const removeItemFromCart = async (id: string) => {
    const response = await props?.deleteItemFromCart(id);
    if (response !== undefined && response !== null) {
      getAllCartItems();
    }
  };

  const handleQuantityChange = async (data: any, type: string) => {
    if (type === "INCREMENT") {
      const response = await props?.quantityChange({
        ...data,
        quantity: data?.quantity + 1,
      });
      if (response !== undefined && response !== null) {
        getAllCartItems();
      }
    } else if (type === "DECREMENT") {
      if (data?.quantity == 1) {
        removeItemFromCart(data?.id);
      } else {
        const response = await props?.quantityChange({
          ...data,
          quantity: data?.quantity - 1,
        });
        if (response !== undefined && response !== null) {
          getAllCartItems();
        }
      }
    }
  };

  const handlePlaceOrder = async () => {
    const length = cartItems?.length;
    const response = await cartItems?.map((item) => {
      props?.deleteItemFromCart(item?.id);
    });
    if (length === response?.length) {
      window?.alert("Order Placed Successfully");
      history("/product-listing");
    }
  };

  const searchItems = async () => {
    const response = await props?.searchCartItems(searchTerm);
    if (
      response !== undefined &&
      response !== null &&
      typeof response === "object"
    ) {
      setCartItems(response);
    }
  };

  useEffect(() => {
    if (searchTerm?.trim() === "") {
      getAllCartItems();
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
      <div className="cart-page-container">
        <p className="home-login-text login-page-create-text">Cart Page</p>
        <div className="cart-items-container">
          <div className="cart-bag-price-container">
            <span className="shopping-bag-text">
              My shopping bag ({cartItems?.length} items)
            </span>
            <span className="total-price"> Total price : {totalBagPrice} </span>
          </div>
          {cartItems?.length > 0 &&
            cartItems?.map((item) => {
              return (
                <div className="item-container" key={item?.id}>
                  <div className="product-details-container">
                    <img className="item-image" src={item?.bookImage} />
                    <div className="details-container">
                      <span className="campus-sutra">
                        {item?.firstName} {item?.lastName}
                      </span>
                      <span className="cart-item-name">
                        {item?.description}
                      </span>
                      <span className="quantity-container">
                        <Button
                          className="quantity-button"
                          onClick={() =>
                            handleQuantityChange(item, "INCREMENT")
                          }
                        >
                          +
                        </Button>
                        <span className="quantity-display-text">
                          {item?.quantity}
                        </span>
                        <Button
                          className="quantity-button"
                          onClick={() =>
                            handleQuantityChange(item, "DECREMENT")
                          }
                        >
                          -
                        </Button>
                      </span>
                    </div>
                  </div>
                  <div className="details-container price-details-container">
                    <span className="campus-sutra p-l-65px">{item?.price}</span>
                    <span className="discount-container">
                      <span className="cart-item-name">
                        {item?.originalPrice}
                      </span>
                      <span className="cart-item-name">
                        {item?.discount} Off
                      </span>
                    </span>
                    <span
                      className="cart-remove-text"
                      onClick={() => removeItemFromCart(item?.id)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              );
            })}
          {cartItems?.length > 0 && (
            <Button className="place-order-button" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = {
  getCartItems,
  deleteItemFromCart,
  quantityChange,
  clearCart,
  searchCartItems,
};

export default connect(null, mapDispatchToProps)(CartPage);
