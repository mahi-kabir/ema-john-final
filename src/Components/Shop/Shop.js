import React, { useEffect, useState } from "react";
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import Cart from '../Cart/Cart'
import "./Shop.css";
import{ addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager'
import { Link } from "react-router-dom";

const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const[cart,setCart] = useState([])
  
  useEffect(() =>{
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart) //extracting keys from objects
    const previousCart = productKeys.map(existingKey => {
      const product = fakeData.find(pd => pd.key === existingKey)
      product.quantity = savedCart[existingKey]
      return product
      //console.log(existingKey, savedCart[existingKey])
    }) //extracting products by using their keys
    setCart(previousCart);
  },[])
  
  const handleAddProduct  = (pp) =>{          
      //console.log('product paisi',pp)
      const toBeAddedKey = pp.key
      const sameProduct = cart.find(pd => pd.key === pp.key) 
      let count = 1;
      let newCart;
      if(sameProduct){
          count = sameProduct.quantity+1;
          sameProduct.quantity = count;
          const others = cart.filter(pd => pd.key !==toBeAddedKey )
          newCart = [...others, sameProduct];
        }

        else{
          pp.quantity = 1;
          newCart = [...cart, pp]
        }
        
        setCart(newCart);
      
        addToDatabaseCart(pp.key,count)
     
  }
  return (
    <div className="twin-container">
      <div className="product-container">
        {
        products.map(pd => 
          <Product 
            key = {pd.key}
            showAddToCart = {true}
            addProduct = {handleAddProduct}
            product={pd}
             > 
          </Product>)
          }
      </div>

      <div className="cart-container">
        <Cart 
          cr = {cart}>
          <Link to = "/review">
            <button className = "main-button">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
