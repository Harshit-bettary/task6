import React from "react";
import '../App.css';
const Modal = ({ cart, onClose, removeFromCart }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <button onClick={onClose} className="close-btn">Close</button>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-img" />
            {item.title}
            <button onClick={() => removeFromCart(item.id)} className="remove-btn">
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

export default Modal;
