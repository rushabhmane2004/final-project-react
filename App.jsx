import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ProductList from './ProductList';
import CartItem from './CartItem';
import './App.css';

function App() {
  const [page, setPage] = useState('landing'); // 'landing' | 'products' | 'cart'

  return (
    <Provider store={store}>
      {page === 'landing' && (
        <div className="landing-page">
          <div className="landing-overlay">
            <h1>🌿 Paradise Nursery</h1>
            <p>Bring nature indoors. Discover our collection of beautiful, healthy houseplants.</p>
            <button className="get-started-btn" onClick={() => setPage('products')}>
              Get Started
            </button>
          </div>
        </div>
      )}

      {page === 'products' && (
        <ProductList onNavigateCart={() => setPage('cart')} onNavigateHome={() => setPage('landing')} />
      )}

      {page === 'cart' && (
        <CartItem onContinueShopping={() => setPage('products')} onNavigateHome={() => setPage('landing')} />
      )}
    </Provider>
  );
}

export default App;
