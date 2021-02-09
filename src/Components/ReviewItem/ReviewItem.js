import React from 'react';

const ReviewItem = (props) => {
    const{name, quantity, key, price} = props.product
   
    const reviewStyle = {
        borderBottom: '1px solid lightgray',
        marginLeft: '15px',
        marginBottom:'3px',
        paddingBottom: '5px'

    }
    return (
        <div style = {reviewStyle}>
            <h2>{name}</h2>
            <h3>Quantity: {quantity}</h3>
            <br/>
            <p><small>Price: ${price}</small></p>
            <button className = "main-button" 
             onClick = {() => props.removeProduct(key)}>
                Remove
            </button>
        </div>
    );
};

export default ReviewItem;