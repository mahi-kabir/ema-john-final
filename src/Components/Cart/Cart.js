import React from "react";


const Cart = (props) => {
  const cc = props.cr;
  //console.log(cc);
  //const totalPrice = cc.reduce((total, prd) => total+prd.price,0)
  let total = 0;
  for (let i = 0; i < cc.length; i++) {
    let product = cc[i];
    total = total + product.price * product.quantity;
    
  }

  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }

  const tax = (total / 10).toFixed(3);
  const grandTotal = (total + shipping+Number(tax)).toFixed(2)
  
  const formatNumber = num => {
      const precision = num.toFixed(2);
      return Number(precision)
  }
  return (
    <div>
      <h3 className = "text-warning">This is cart</h3>
      <h4 className = "text-danger">Items Ordered: {cc.length}</h4>
  <p>Product Price: ${formatNumber(total)}</p>
      <p>
        <small>Shipping Cost:${shipping}</small>
      </p>
      <p>
        <small>Tax+VAT: ${tax}</small>
      </p>
      <h4>Total Price: ${grandTotal}</h4>
      <br/>
      {
        props.children
      }
    </div>
  );
};

export default Cart;
