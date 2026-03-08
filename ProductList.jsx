import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, selectCartCount } from './CartSlice';

const plantsData = [
  // Category 1: Air Purifying Plants
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Spider Plant', price: 12.99, description: 'Great for beginners', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chlorophytum_comosum0.jpg/320px-Chlorophytum_comosum0.jpg' },
      { id: 2, name: 'Peace Lily', price: 15.99, description: 'Elegant white blooms', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/320px-Spathiphyllum_cochlearispathum_RTBG.jpg' },
      { id: 3, name: 'Snake Plant', price: 18.99, description: 'Nearly indestructible', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/320px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg' },
      { id: 4, name: 'Aloe Vera', price: 10.99, description: 'Medicinal and stylish', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/320px-Aloe_vera_flower_inset.png' },
      { id: 5, name: 'Boston Fern', price: 14.99, description: 'Lush and feathery', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Boston_fern_2.jpg/320px-Boston_fern_2.jpg' },
      { id: 6, name: 'Bamboo Palm', price: 22.99, description: 'Tropical feel indoors', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Ravenea_rivularis1.jpg/320px-Ravenea_rivularis1.jpg' },
    ]
  },
  // Category 2: Low Light Plants
  {
    category: 'Low Light Plants',
    plants: [
      { id: 7, name: 'Pothos', price: 8.99, description: 'Thrives in low light', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Epipremnum_aureum_31082012.jpg/320px-Epipremnum_aureum_31082012.jpg' },
      { id: 8, name: 'ZZ Plant', price: 19.99, description: 'Drought tolerant beauty', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Zamioculcas_zamiifolia_1.jpg/320px-Zamioculcas_zamiifolia_1.jpg' },
      { id: 9, name: 'Cast Iron Plant', price: 16.99, description: 'Extremely hardy', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Aspidistra_elatior1.jpg/320px-Aspidistra_elatior1.jpg' },
      { id: 10, name: 'Dracaena', price: 21.99, description: 'Tall and striking', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Dracaena_marginata.jpg/320px-Dracaena_marginata.jpg' },
      { id: 11, name: 'Chinese Evergreen', price: 17.99, description: 'Colorful patterned leaves', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Aglaonema_commutatum.jpg/320px-Aglaonema_commutatum.jpg' },
      { id: 12, name: 'Philodendron', price: 13.99, description: 'Heart-shaped leaves', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Philodendron_hederaceum.jpg/320px-Philodendron_hederaceum.jpg' },
    ]
  },
  // Category 3: Flowering Plants
  {
    category: 'Flowering Plants',
    plants: [
      { id: 13, name: 'Orchid', price: 24.99, description: 'Elegant long-lasting blooms', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Phalaenopsis_amabilis.jpg/320px-Phalaenopsis_amabilis.jpg' },
      { id: 14, name: 'African Violet', price: 9.99, description: 'Compact and colorful', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/African_violet.jpg/320px-African_violet.jpg' },
      { id: 15, name: 'Anthurium', price: 20.99, description: 'Waxy red spathes', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Anthurium_andraeanum.jpg/320px-Anthurium_andraeanum.jpg' },
      { id: 16, name: 'Bromeliad', price: 18.99, description: 'Tropical and vibrant', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Guzmania_lingulata.jpg/320px-Guzmania_lingulata.jpg' },
      { id: 17, name: 'Kalanchoe', price: 11.99, description: 'Long blooming succulent', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Kalanchoe_blossfeldiana.jpg/320px-Kalanchoe_blossfeldiana.jpg' },
      { id: 18, name: 'Begonia', price: 13.49, description: 'Rich colorful flowers', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Begonia_%C3%97_tuberhybrida1.jpg/320px-Begonia_%C3%97_tuberhybrida1.jpg' },
    ]
  },
];

function Navbar({ cartCount, onNavigateCart, onNavigateHome }) {
  return (
    <nav className="navbar">
      <h2>🌿 Paradise Nursery</h2>
      <ul className="navbar-links">
        <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }}>Home</a></li>
        <li><a href="#plants">Plants</a></li>
        <li>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCart(); }} className="cart-icon">
            🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </a>
        </li>
      </ul>
    </nav>
  );
}

function ProductList({ onNavigateCart, onNavigateHome }) {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const cartItems = useSelector(state => state.cart.items);
  const [addedIds, setAddedIds] = useState([]);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedIds(prev => [...prev, plant.id]);
  };

  const isAdded = (id) => addedIds.includes(id) || cartItems.some(item => item.id === id);

  return (
    <div className="product-list-page">
      <Navbar cartCount={cartCount} onNavigateCart={onNavigateCart} onNavigateHome={onNavigateHome} />

      {plantsData.map((categoryGroup) => (
        <div key={categoryGroup.category} className="category-section" id="plants">
          <h2>{categoryGroup.category}</h2>
          <div className="plants-grid">
            {categoryGroup.plants.map((plant) => (
              <div key={plant.id} className="plant-card">
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>{plant.description}</p>
                <div className="plant-price">${plant.price.toFixed(2)}</div>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(plant)}
                  disabled={isAdded(plant.id)}
                >
                  {isAdded(plant.id) ? 'Added ✓' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
