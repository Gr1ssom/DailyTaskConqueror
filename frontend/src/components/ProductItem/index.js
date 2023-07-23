import React from 'react';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../utils/actions'; // or whatever your action type is named

function ProductItem({ _id, image, name, price, quantity }) {
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch({
            type: ADD_TO_CART,
            product: { _id, image, name, price, quantity }
        });
    };

    return (
        <div className="product-item">
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <p>Price: ${price}</p>
            <p>Available Quantity: {quantity}</p>
            <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default ProductItem;
