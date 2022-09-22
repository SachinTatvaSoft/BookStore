import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { getBooks, searchBooks } from "../Product Page/Actions";
import SearchHeader from "../SearchHeader/SearchHeader";
import { addToCart } from "./Actions";

type cartPageProps = {
  getBooks: () => void;
  addToCart: (data: any) => void;
  searchBooks: (term: string) => void;
};

function ListingPage(props: cartPageProps) {
  const [data, setData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const history = useNavigate();

  const getAllBooks = async () => {
    const response = await props?.getBooks();
    if (response !== undefined && response !== null) {
      setData(response);
    }
  };

  const addToCart = async (item: any) => {
    const response = await props?.addToCart({ ...item, quantity: 1 });
    if (response !== undefined && response !== null) {
      history("/cart");
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
      <div className="product-list-page-main-container">
        <p className="home-login-text login-page-create-text">
          Product Listing
        </p>
        <div className="product-list-items-container">
          <div className="product-list-items-sub-container">
            {data?.length > 0 &&
              data?.map((item) => {
                return (
                  <div className="product-list-item-container" key={item?.id}>
                    <img
                      className="product-listing-image"
                      src={item.bookImage}
                      
                    />
                    <div className="product-list-details-container">
                      <p className="product-name">
                        {item?.firstName} {item?.lastName}
                      </p>
                      <p className="product-description">{item?.description}</p>
                      <p className="product-description-lorem">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Suscipit vitae molestias cumque! Dolorem ullam tempore
                        voluptatibus quod, ducimus necessitatibus ad id atque
                        ipsam, praesentium aliquam animi. Quo repudiandae ad
                        corrupti.
                      </p>
                      <span className="price-discount-details">
                        <span className="price-container">
                          MRP ₹
                          <span className="original-price">
                            {item?.originalPrice}
                          </span>
                          <span className="discount-label">
                            {item?.discount} OFF
                          </span>
                        </span>
                        <span className="price">₹ {item?.price}</span>
                      </span>
                      <Button
                        className="add-to-cart-button"
                        onClick={() => addToCart(item)}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

const mapDispatchToProps = {
  getBooks,
  addToCart,
  searchBooks,
};

export default connect(null, mapDispatchToProps)(ListingPage);
