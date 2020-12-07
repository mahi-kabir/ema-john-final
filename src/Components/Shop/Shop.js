import React, { useState } from "react";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import Cart from '../Cart/Cart'

import "./Shop.css";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const[cart,setCart] = useState([])
  const handleAddProduct  = (pp) =>{
      console.log('product paisi',pp)
      const newCart = [...cart,pp]
      setCart(newCart)
  }
  return (
    <div className="shop-container">
      <div className="product-container">
        {
        products.map(pd => 
          <Product 
            addProduct = {handleAddProduct}
            product={pd}
             > 
          </Product>)
          }
      </div>

      <div className="cart-container">
        <Cart cr = {cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
