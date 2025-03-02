import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

const ProductPage = ({ addToCart, cart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="container">
      <nav className="navbar">
        <h1>Fake Store</h1>
        <Link to="/cart" className="cart-link">Cart ({cart.length})</Link>
      </nav>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-img" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            {cart.some(item => item.id === product.id) ? (
              <button className="remove-btn" onClick={() => addToCart(product, true)}>Remove from Cart</button>
            ) : (
              <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CartPage = ({ cart, addToCart }) => {
  const calculateTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total > 0 ? total - total * 0.1 : 0;
  };

  return (
    <div className="container">
      <nav className="navbar">
        <Link to="/" className="cart-link">Back to Products</Link>
        <h1>Cart</h1>
      </nav>
      <div className="cart-container">
        {cart.length === 0 ? <p className="empty-cart">Your cart is empty</p> : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-img" />
              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>${item.price} x {item.quantity}</p>
                <div className="cart-actions">
                  <button className="remove-btn" onClick={() => addToCart(item, true)}>Remove</button>
                  <button className="add-btn" onClick={() => addToCart(item)}>+</button>
                  <button className="decrease-btn" onClick={() => addToCart(item, false, true)}>-</button>
                </div>
              </div>
            </div>
          ))
        )}
        <h2 className="total-price">Total: ${calculateTotal().toFixed(2)}</h2>
      </div>
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, remove = false, decrease = false) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (remove) {
        return prevCart.filter(item => item.id !== product.id);
      } else if (decrease && existing && existing.quantity > 1) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item);
      } else if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage addToCart={addToCart} cart={cart} />} />
        <Route path="/cart" element={<CartPage cart={cart} addToCart={addToCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
