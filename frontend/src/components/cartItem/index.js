import React from 'react';

const CartItem = ({ item, onRemove }) => {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <p>${item.price.toFixed(2)}</p>
        <p>Quantity: {item.purchaseQuantity}</p>
        <button onClick={() => onRemove(item._id)}>Remove from Cart</button>
      </div>
    </div>
  );
};

export default CartItem;
