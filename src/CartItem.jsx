import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // 1) סכום כולל של כל פריטי העגלה
  const calculateTotalAmount = () => {
    return cart.reduce((sum, it) => sum + (it.cost * it.quantity), 0);
  };

  // 2) המשך קניות (קריאה לפונקציה שמגיעה מההורה)
  const handleContinueShopping = (e) => {
    if (onContinueShopping) onContinueShopping(e);
  };

  // 3) הגדלת כמות
  const handleIncrement = (item) => {
    const id = item.id ?? item.name; // עדיף שיהיה item.id
    dispatch(updateQuantity({ id, delta: +1 }));
  };

  // 4) הקטנת כמות (אם מגיע ל-0 מסירים)
  const handleDecrement = (item) => {
    const id = item.id ?? item.name;
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id, delta: -1 }));
    } else {
      dispatch(removeItem(id));
    }
  };

  // 5) מחיקת פריט
  const handleRemove = (item) => {
    const id = item.id ?? item.name;
    dispatch(removeItem(id));
  };

  // 6) מחיר ביניים לפריט
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.id ?? item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>

              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>

                <span className="cart-item-quantity-value">{item.quantity}</span>

                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>

              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>

              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => alert('Functionality to be added for future reference')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
