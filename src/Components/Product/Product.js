import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Product = (props) => {
    //console.log(props)
  const { name, img, seller, price, stock, key } = props.product;
  return (
    <div className="product">
      <div>
        <img src={img} alt="" srcset="" />
      </div>

      <div>
        <h4 className="product-name"><Link to = {"/product/"+key}>{name}</Link></h4>
        <br />
        <p className="name">
          <small>By:{seller}</small>
        </p>
        <br />
        <p className="name">Price: ${price}</p>
        <br/>
        {props.showAddToCart && <button className="main-button" onClick = {() => props.addProduct(props.product)}>
          <FontAwesomeIcon icon={faShoppingBasket} />
            add
          </button>
        }
        <br />
        <p>
          <small>Only {stock} left in the stock- Order Soon</small>
        </p>
      </div>
    </div>
  );
};

export default Product;
