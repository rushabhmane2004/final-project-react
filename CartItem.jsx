import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} from './CartSlice';

function Navbar({ cartCount, onNavigateHome, onNavigatePlants }) {
  return (
    <nav className="navbar">
      <h2>🌿 Paradise Nursery</h2>
      <ul className="navbar-links">
        <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }}>Home</a></li>
        <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigatePlants(); }}>Plants</a></li>
        <li>
          <span className="cart-icon">
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </span>
        </li>
      </ul>
    </nav>
  );
}

function CartItem({ onContinueShopping, onNavigateHome }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const cartCount = useSelector(selectCartCount);

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery 🌿');
  };

  return (
    <div>
      <Navbar
        cartCount={cartCount}
        onNavigateHome={onNavigateHome}
        onNavigatePlants={onContinueShopping}
      />
      <div className="cart-page">
        <h1>🛒 Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty. 🌱</p>
            <br />
            <button className="continue-btn" onClick={onContinueShopping}>
              Browse Plants
            </button>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <div className="cart-item-controls">
                  <button className="qty-btn" onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
                  <span style={{ fontSize: '1.1rem', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                  <button className="qty-btn" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                  <button className="delete-btn" onClick={() => dispatch(removeItem(item.id))}>Delete</button>
                </div>
              </div>
            ))}

            <div className="cart-total">
              Total Amount: ${cartTotal.toFixed(2)}
            </div>

            <div className="cart-actions">
              <button className="continue-btn" onClick={onContinueShopping}>
                ← Continue Shopping
              </button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartItem;
