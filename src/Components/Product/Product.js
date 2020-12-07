import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

const Product = (props) => {
    //console.log(props)
  const { name, img, seller, price, stock } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" srcset="" />
      </div>

      <div>
        <h4 className="product-name">{name}</h4>
        <br />
        <p className="name">
          <small>By:{seller}</small>
        </p>
        <br />
        <p className="name">Price: ${price}</p>
        <button className="name main-button" onClick = {() => props.addProduct(props.product)}>
          {" "}
          <FontAwesomeIcon icon={faShoppingBasket} /> Add to cart
        </button>
        <br />
        <p>
          <small>Only {stock} left in the stock- Order Soon</small>
        </p>
      </div>
    </div>
  );
};

export default Product;
