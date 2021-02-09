import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import image from '../../images/giphy.gif'
import { useHistory } from 'react-router-dom';


const Review = () => {
    
    const[cart, setCart] = useState([]);
    const[orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory()
    const handleProceedCheckout = () => {
        history.push("/shipment")
    }
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }
    useEffect( () =>{
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart)
        const cartProducts = productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key)
            product.quantity = savedCart[key]
            return product
        })
        setCart(cartProducts)
    }, [])

    let thankYou;
    if (orderPlaced){
        thankYou = <img src={image} alt="" srcset=""/>
    }
    return (
        <div className = "twin-container">
            <div className = "product-container">
                {
                cart.map(pd => 
                <ReviewItem 
                        
                        product = {pd}
                        key = {pd.key} 
                        removeProduct = {removeProduct}> 

                    </ReviewItem>
                )
            }  
            {thankYou}
            </div>
            
            <div className = "cart-container">
                <Cart cr = {cart}>
                    <button onClick={handleProceedCheckout} className = "main-button">Proceed</button>
                    
                </Cart>
            </div>
        </div>
    );
};

export default Review;