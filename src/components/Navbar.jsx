import React from "react";
import '../App.css';
const Navbar = ({ cartCount, onCartClick }) => (
  <div className="navbar">
    <h1>Fake Store</h1>
    <button onClick={onCartClick} className="cart-btn">
      Cart ({cartCount})
    </button>
  </div>
);

export default Navbar;
